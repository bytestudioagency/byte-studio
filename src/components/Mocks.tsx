// Product mockups drawn in markup, so the page ships no screenshots or stock imagery.

const bars = [38, 52, 44, 68, 58, 82, 74, 96, 70, 88, 62, 100];

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
      <span className="size-2 rounded-full bg-white/15" />
      <span className="size-2 rounded-full bg-white/15" />
      <span className="size-2 rounded-full bg-white/15" />
      <span className="ml-3 rounded-full bg-white/5 px-3 py-0.5 font-mono text-[10px] text-fog">{label}</span>
    </div>
  );
}

export function DashboardMock({ label = "app.ledgerly.io" }: { label?: string }) {
  return (
    <div aria-hidden className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-coal text-left">
      <WindowBar label={label} />
      <div className="grid sm:grid-cols-[auto_1fr]">
        <div className="hidden flex-col gap-3 border-r border-white/5 p-4 sm:flex">
          {[1, 0, 0, 0, 0].map((active, i) => (
            <span key={i} className={`size-7 rounded-lg ${active ? "bg-accent/90" : "bg-white/5"}`} />
          ))}
        </div>
        <div className="min-w-0 space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["Cash in", "\u20b984.2L", "+12.4%"],
              ["Cash out", "\u20b951.7L", "−3.1%"],
              ["Runway", "14 mo", "+2 mo"],
            ].map(([k, v, d]) => (
              <div key={k} className="min-w-0 rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/5 sm:p-3">
                <p className="truncate font-mono text-[9px] text-fog uppercase sm:tracking-wider">{k}</p>
                <p className="mt-1.5 text-[13px] font-medium tracking-tight whitespace-nowrap sm:text-base md:text-xl">{v}</p>
                <p className="mt-0.5 font-mono text-[9px] text-accent">{d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Net cash flow</p>
              <p className="font-mono text-[9px] text-fog">Last 12 months</p>
            </div>
            <div className="mt-4 flex h-28 items-end gap-1.5 md:h-36">
              {bars.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-white/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneMock() {
  const slots = ["09:00", "09:30", "10:15", "11:00", "13:30", "14:00"];
  return (
    <div aria-hidden className="w-44 rounded-[2rem] bg-white/[0.06] p-1.5 text-left ring-1 ring-white/15 md:w-52">
      <div className="rounded-[calc(2rem-0.375rem)] bg-[#0e0e10] px-3.5 pt-3 pb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <div className="mx-auto h-1 w-12 rounded-full bg-white/15" />
        <p className="mt-4 font-mono text-[9px] tracking-wider text-fog uppercase">Thu 12 Dec</p>
        <p className="mt-1 text-sm font-medium tracking-tight">Pick a time</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {slots.map((s, i) => (
            <span
              key={s}
              className={`rounded-lg py-2 text-center font-mono text-[10px] ${
                i === 2 ? "bg-accent text-ink" : "bg-white/5 text-fog ring-1 ring-white/5"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/5">
          <p className="text-[10px] font-medium">Dr. A. Rahman</p>
          <p className="font-mono text-[9px] text-fog">General check-up · 20 min</p>
        </div>
        <div className="mt-3 rounded-full bg-white py-2 text-center text-[10px] font-medium text-ink">Confirm booking</div>
      </div>
    </div>
  );
}

export function StoreMock() {
  return (
    <div aria-hidden className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-coal text-left">
      <WindowBar label="crate.store" />
      <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
        {[
          ["Field Jacket", "\u20b92,499", "from-accent/25"],
          ["Canvas Tote", "\u20b9799", "from-white/15"],
          ["Wool Beanie", "\u20b9499", "from-white/10"],
        ].map(([name, price, tone]) => (
          <div key={name}>
            <div className={`aspect-[4/5] rounded-xl bg-gradient-to-b ${tone} to-white/[0.02] ring-1 ring-white/5`} />
            <p className="mt-2 truncate text-[10px] font-medium">{name}</p>
            <p className="font-mono text-[9px] text-fog">{price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
