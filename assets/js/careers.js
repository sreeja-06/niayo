// Careers page JS - dynamic job/internship loading

document.addEventListener('DOMContentLoaded', function() {
    fetchJobsAndRender();
});

function fetchJobsAndRender() {
    fetch('http://127.0.0.1:5000/api/jobs')
        .then(response => response.json())
        .then(jobs => {
            renderJobs(jobs);
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
}

function renderJobs(jobs) {
    // Separate jobs and internships
    const jobList = jobs.filter(j => j.category.toLowerCase() === 'job' || j.category.toLowerCase() === 'full-time');
    const internshipList = jobs.filter(j => j.category.toLowerCase() === 'internship');

    // Find containers
    const jobsGrid = document.querySelector('.jobs-section .careers-grid');
    const internshipsGrid = document.querySelector('.internships-section .careers-grid');
    if (jobsGrid) jobsGrid.innerHTML = '';
    if (internshipsGrid) internshipsGrid.innerHTML = '';

    // Render job cards
    jobList.forEach(job => {
        if (jobsGrid) jobsGrid.appendChild(createJobCard(job));
    });
    internshipList.forEach(job => {
        if (internshipsGrid) internshipsGrid.appendChild(createJobCard(job));
    });
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.innerHTML = `
        <div class="career-header">
            <div class="career-title">
                <h3>${job.job_name}</h3>
                <span class="job-type">${job.category}</span>
            </div>
        </div>
        <div class="career-content">
            <div class="job-title"><b>Title:</b> ${job.title}</div>
            <div class="job-details">
                <span class="start-date"><i class="fas fa-calendar"></i> ${job.start_date}</span>
            </div>
            <div class="career-footer">
                <a href="careers-apply-form.html?post=${encodeURIComponent(job.job_name)}" class="btn btn-primary">Apply Now <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `;
    return card;
}

function formatSkills(skills) {
    if (!skills) return '';
    // If comma-separated, split and join as badges
    return skills.split(',').map(s => `<span class='skill-badge'>${s.trim()}</span>`).join(' ');
}
