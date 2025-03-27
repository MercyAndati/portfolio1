const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove any existing success message
        const existingMessage = this.querySelector('.form-success');
        if (existingMessage) existingMessage.remove();
        
        // Show temporary "sending" message
        const sendingMessage = document.createElement('div');
        sendingMessage.className = 'form-success';
        sendingMessage.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i><p>Sending your message...</p>`;
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', sendingMessage);
        
        // Submit the form data to FormSubmit
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                sendingMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent.</p>
                `;
                this.reset();
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            sendingMessage.innerHTML = `
                <i class="fas fa-times-circle"></i>
                <p>Failed to send. Please try again or email me directly.</p>
            `;
        })
        .finally(() => {
            // Auto-remove message after 5 seconds
            setTimeout(() => {
                sendingMessage.classList.add('fade-out');
                setTimeout(() => sendingMessage.remove(), 500);
            }, 5000);
        });
    });
}