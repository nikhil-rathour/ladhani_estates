export default function Stats() {
  const stats = [
    { number: '5000+', label: 'Properties Listed' },
    { number: '12000+', label: 'Happy Clients' },
    { number: '50+', label: 'Cities Covered' },
    { number: '15+', label: 'Years of Experience' }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
