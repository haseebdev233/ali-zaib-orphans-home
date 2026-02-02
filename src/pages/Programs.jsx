function Programs() {
  const programs = [
    "Free Education",
    "Healthcare Support",
    "Skill Development",
    "Food & Shelter",
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Our Programs</h2>

      <div className="row g-4">
        {programs.map((program, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <h5>{program}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programs;
