// Populate job title, description, and skills from query param
window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const post = params.get('post') || 'Job Title';
    const jobTitleEl = document.getElementById('job-title');
    if (jobTitleEl) jobTitleEl.textContent = post;

    // Example job data (in real use, fetch from backend or map)
    const jobData = {
        'Frontend Developer': {
            description: 'Build beautiful, responsive web interfaces using React, Vue, or Angular. Collaborate with designers and backend engineers.',
            skills: ['HTML, CSS, JS', 'React/Vue/Angular', 'REST APIs', 'UI/UX', 'Teamwork']
        },
        'Backend Developer': {
            description: 'Architect and develop robust backend systems using Node.js, Python, or Java. Work on APIs, databases, and cloud deployments.',
            skills: ['Node.js/Python/Java', 'APIs', 'Databases', 'Cloud', 'Problem Solving']
        },
        'Marketing Intern': {
            description: 'Assist in digital marketing campaigns, content creation, and social media management. Learn from industry experts.',
            skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Communication', 'Creativity']
        },
        'Business Analyst Intern': {
            description: 'Analyze business processes, gather requirements, and support project management for digital transformation projects.',
            skills: ['Business Analysis', 'Requirement Gathering', 'Project Management', 'Excel', 'Analytical Thinking']
        }
    };
    const job = jobData[post];
    const descEl = document.getElementById('job-description');
    if (descEl) descEl.textContent = job ? job.description : 'Description not available.';
    const skillsList = document.getElementById('job-skills');
    if (skillsList) {
        skillsList.innerHTML = '';
        if (job && job.skills) {
            job.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });
        } else {
            skillsList.innerHTML = '<li>Skills not available.</li>';
        }
    }

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
