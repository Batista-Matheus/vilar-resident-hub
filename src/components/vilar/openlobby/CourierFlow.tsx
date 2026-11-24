import { Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gpsDistances, parcelPhotos, type AuditEntry, type GpsState } from "@/data/openlobby";
import { GEOFENCE_RADIUS_M, generatePin, intercomStages, PIN_TTL_SECONDS } from "@/lib/openlobby";
import { GeofenceBadge } from "./GeofenceBadge";
import { StepCapture, type CaptureValues } from "./StepCapture";
import { StepIntercom } from "./StepIntercom";
import { StepPin } from "./StepPin";

type Step = "capture" | "pin" | "intercom";

const EMPTY: CaptureValues = { photo: null, unit: "", name: "", newResident: false };
const STAGE_MS = 1200;

interface Props {
  gps: GpsState;
  onGpsChange: (s: GpsState) => void;
  deliveryCount: number;
  onDelivered: (entry: AuditEntry) => void;
}

export function CourierFlow({ gps, onGpsChange, deliveryCount, onDelivered }: Props) {
  const [step, setStep] = useState<Step>("capture");
  const [values, setValues] = useState<CaptureValues>(EMPTY);
  const [pin, setPin] = useState("4829");
  const [checksDone, setChecksDone] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PIN_TTL_SECONDS);
  const [reached, setReached] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const samplePhoto = parcelPhotos[deliveryCount % parcelPhotos.length] ?? parcelPhotos[0];
  const checks = [
    "Parcel detected in photo",
    `Label addressed to Unit ${values.unit || "—"}`,
    `Geotag inside ${GEOFENCE_RADIUS_M} m lobby geofence`,
  ];
  const validating = step === "pin" && checksDone < checks.length;
  const stages = intercomStages(pin);

  function schedule(fn: () => void, ms: number) {
    timers.current.push(setTimeout(fn, ms));
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // PIN countdown runs only while the PIN is on screen.
  useEffect(() => {
    if (step !== "pin" || validating || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, validating, secondsLeft]);

  function submit() {
    setPin(deliveryCount === 0 ? "4829" : generatePin());
    setChecksDone(0);
    setSecondsLeft(PIN_TTL_SECONDS);
    setStep("pin");
    [1, 2, 3].forEach((n) => schedule(() => setChecksDone(n), n * 450));
  }

  function simulate() {
    setStep("intercom");
    setReached(0);
    stages.forEach((_, i) =>
      schedule(() => {
        setReached(i + 1);
        if (i === stages.length - 1) {
          onDelivered({
            id: `d${Date.now()}`,
            photo: values.photo ?? samplePhoto,
            unit: values.unit,
            resident: values.name.trim(),
            newResident: values.newResident,
            courier: "QR web flow",
            gpsVerified: true,
            gpsDistanceM: gpsDistances.verified,
            pin,
            voiceMatched: true,
            timestamp: new Date().toISOString(),
          });
        }
      }, (i + 1) * STAGE_MS),
    );
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setValues(EMPTY);
    setStep("capture");
    setReached(0);
  }

  return (
    <div className="space-y-4 px-4 pb-6 pt-2">
      <header className="space-y-2 border-b border-border pb-3">
        <p className="flex items-center gap-2 text-[15px] font-semibold leading-tight tracking-tight">
          <Building2 className="h-4 w-4 text-lime" /> The Grove — Instant Lobby Access
        </p>
        <GeofenceBadge state={gps} />
        <p className="text-[11px] text-muted-foreground">No app needed · scanned from the lobby QR code</p>
      </header>

      {step === "capture" && (
        <StepCapture
          gps={gps}
          onGpsResolve={() => onGpsChange("verified")}
          samplePhoto={samplePhoto}
          values={values}
          onChange={setValues}
          onSubmit={submit}
        />
      )}
      {step === "pin" && (
        <StepPin
          validating={validating}
          checks={checks}
          checksDone={checksDone}
          pin={pin}
          secondsLeft={secondsLeft}
          onSimulate={simulate}
          onRegenerate={submit}
        />
      )}
      {step === "intercom" && <StepIntercom stages={stages} reached={reached} onReset={reset} />}
    </div>
  );
}
