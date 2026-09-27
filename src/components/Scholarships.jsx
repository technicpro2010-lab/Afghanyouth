// NOTE: these are placeholder examples built from the "Education" service
// list you provided (Japanese Language Classes, Education Support,
// Seminars & Workshops, Scholarship/Educational Programs, Community &
// Cultural Activities). Swap in your actual current programs, formats,
// and enrollment status.
const programs = [
  {
    name: 'Japanese Language Classes',
    format: 'Group / private lessons',
    audience: 'All levels, beginner to advanced',
    status: 'Rolling enrollment',
  },
  {
    name: 'Scholarship & Educational Program Support',
    format: 'One-on-one advising',
    audience: 'Students applying to Japanese institutions',
    status: 'By appointment',
  },
  {
    name: 'Seminars & Workshops',
    format: 'In-person / online',
    audience: 'Residents & entrepreneurs',
    status: 'Scheduled monthly',
  },
  {
    name: 'Community & Cultural Activities',
    format: 'Group events',
    audience: 'Foreign residents & families',
    status: 'Ongoing',
  },
]

export default function Scholarships() {
  return (
    <section id="education-programs" className="section">
      <div className="section-inner">
        <span className="eyebrow">Education</span>
        <h2 className="mb-8">Education programs we support.</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="table-header">Program</th>
                <th className="table-header">Format</th>
                <th className="table-header">Who it's for</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.name}>
                  <td className="table-cell font-semibold text-ink">{p.name}</td>
                  <td className="table-cell">{p.format}</td>
                  <td className="table-cell">{p.audience}</td>
                  <td className="table-cell">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          Not sure which program fits you? Book a session below and we'll
          walk you through options, including scholarship and educational
          program applications.
        </p>
      </div>
    </section>
  )
}
