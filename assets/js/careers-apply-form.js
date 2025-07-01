// Populate job title, description, and skills from query param
window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const post = params.get('post') || 'Job Title';
    const jobTitleEl = document.getElementById('job-title');
    if (jobTitleEl) jobTitleEl.textContent = post;

    // Fetch job data from backend by job_name
    fetch(`http://127.0.0.1:5000/api/jobs/by-name/${encodeURIComponent(post)}`)
        .then(res => res.json())
        .then(job => {
            const descEl = document.getElementById('job-description');
            if (descEl) descEl.textContent = job.description || 'Description not available.';
            const skillsList = document.getElementById('job-skills');
            if (skillsList) {
                skillsList.innerHTML = '';
                if (job.required_skills) {
                    job.required_skills.split(',').forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill.trim();
                        skillsList.appendChild(li);
                    });
                } else {
                    skillsList.innerHTML = '<li>Skills not available.</li>';
                }
            }
        })
        .catch(() => {
            const descEl = document.getElementById('job-description');
            if (descEl) descEl.textContent = 'Description not available.';
            const skillsList = document.getElementById('job-skills');
            if (skillsList) skillsList.innerHTML = '<li>Skills not available.</li>';
        });

    // Basic form validation and submission
    const form = document.querySelector('.apply-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            // Add job_applied_for from job title
            const jobTitle = document.getElementById('job-title')?.textContent || '';
            formData.append('job_applied_for', jobTitle);
            fetch('http://127.0.0.1:5000/api/job_applications', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Application submitted successfully!');
                    form.reset();
                } else {
                    alert('Error: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(err => {
                alert('Submission failed. Please try again.');
            });
        });
    }
});
