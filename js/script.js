
/* =========================================================
   BeeReady | WEDE5020 - Part 3
   Mobile menu, FAQ accordion, product gallery, dynamic
   ingredient search/sort, form validation and AJAX.
   ========================================================= */

'use strict';

// Enables mobile and enhanced styles from css/style.css.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initFaqAccordion();
    initProductGallery();
    initIngredients();
    initForms();
});

/* =========================================================
   1. MOBILE NAVIGATION - ALL PAGES
   ========================================================= */

function initMobileNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primary-navigation');
    if (!toggle || !nav) return;

    function closeMenu(focusButton = false) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        if (focusButton) toggle.focus();
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
        } else {
            nav.classList.add('menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Close navigation menu');
        }
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('menu-open')) {
            closeMenu(true);
        }
    });

    document.addEventListener('click', event => {
        if (nav.classList.contains('menu-open') &&
            !nav.contains(event.target) &&
            !toggle.contains(event.target)) {
            closeMenu();
        }
    });

    const desktopView = window.matchMedia('(min-width: 769px)');

    if (typeof desktopView.addEventListener === 'function') {
        desktopView.addEventListener('change', event => {
            if (event.matches) closeMenu();
        });
    }
}

/* =========================================================
   2. FAQ ACCORDION - faq.html
   Converts existing cards to accessible expandable answers.
   Without JavaScript the answers remain readable.
   ========================================================= */

function initFaqAccordion() {
    const cards = document.querySelectorAll('.faq-card');
    if (!cards.length) return;

    cards.forEach((card, index) => {
        const heading = card.querySelector('h3');
        if (!heading) return;

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.id = `faq-answer-${index + 1}`;

        // Move existing paragraphs and links into an answer panel.
        while (heading.nextSibling) {
            answer.append(heading.nextSibling);
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'faq-question';
        button.textContent = heading.textContent.trim();
        button.setAttribute('aria-controls', answer.id);
        button.setAttribute('aria-expanded', String(index === 0));

        heading.replaceChildren(button);
        card.append(answer);
        card.classList.add('is-enhanced');
        answer.hidden = index !== 0;

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isOpen));
            answer.hidden = isOpen;
        });
    });
}

/* =========================================================
   3. PRODUCT GALLERY AND LIGHTBOX - products.html
   Thumbnails select the main image. Clicking the main image
   opens a modal viewer with previous/next and Escape support.
   ========================================================= */

function initProductGallery() {
    const mainButton = document.querySelector('.gallery-main[data-gallery-src]');
    if (!mainButton) return;

    const mainImage = mainButton.querySelector('img');
    const thumbs = [...document.querySelectorAll('.gallery-thumb[data-gallery-src]')];
    const images = thumbs.length ? thumbs : [mainButton];
    let currentIndex = 0;
    let lastFocusedElement = null;

    function selectImage(index) {
        currentIndex = (index + images.length) % images.length;
        const selected = images[currentIndex].dataset;

        mainButton.dataset.gallerySrc = selected.gallerySrc;
        mainButton.dataset.galleryAlt = selected.galleryAlt || 'BeeReady product';

        if (mainImage) {
            mainImage.src = selected.gallerySrc;
            mainImage.alt = selected.galleryAlt || 'BeeReady product';
        }

        thumbs.forEach((thumb, thumbIndex) => {
            const active = thumbIndex === currentIndex;
            thumb.classList.toggle('is-selected', active);
            thumb.setAttribute('aria-pressed', String(active));
        });
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => selectImage(index));
    });

    selectImage(0);

    // If <dialog> is unsupported, the normal gallery still works.
    if (typeof HTMLDialogElement === 'undefined' ||
        typeof HTMLDialogElement.prototype.showModal !== 'function') return;

    const dialog = document.createElement('dialog');
    dialog.className = 'gallery-dialog';
    dialog.setAttribute('aria-label', 'BeeReady product image viewer');

    dialog.innerHTML = `
        <div class="gallery-dialog-inner">
            <button type="button" class="gallery-close" aria-label="Close image viewer">&times;</button>
            <button type="button" class="gallery-prev" aria-label="Previous image">&#8249;</button>
            <img class="gallery-large-image" alt="">
            <button type="button" class="gallery-next" aria-label="Next image">&#8250;</button>
            <p class="gallery-caption"></p>
        </div>
    `;

    document.body.append(dialog);

    const largeImage = dialog.querySelector('.gallery-large-image');
    const caption = dialog.querySelector('.gallery-caption');

    function updateLightbox() {
        const selected = images[currentIndex].dataset;
        largeImage.src = selected.gallerySrc;
        largeImage.alt = selected.galleryAlt || 'BeeReady product';
        caption.textContent = largeImage.alt;
    }

    function nextImage(direction) {
        selectImage(currentIndex + direction);
        updateLightbox();
    }

    function closeLightbox() {
        if (dialog.open) dialog.close();
    }

    mainButton.addEventListener('click', () => {
        lastFocusedElement = document.activeElement;
        updateLightbox();
        dialog.showModal();
        dialog.querySelector('.gallery-close').focus();
    });

    dialog.querySelector('.gallery-close').addEventListener('click', closeLightbox);

    dialog.querySelector('.gallery-prev').addEventListener('click', () => nextImage(-1));

    dialog.querySelector('.gallery-next').addEventListener('click', () => nextImage(1));

    dialog.addEventListener('click', event => {
        if (event.target === dialog) closeLightbox();
    });

    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') nextImage(1);
        if (event.key === 'ArrowLeft') nextImage(-1);
    });

    dialog.addEventListener('close', () => lastFocusedElement?.focus());
}

/* =========================================================
   4. DYNAMIC INGREDIENTS - products.html
   Loads data/ingredients.json with fetch(). If opened with
   file://, falls back to the four HTML cards already on page.
   ========================================================= */

async function initIngredients() {
    const grid = document.getElementById('ingredient-grid');
    const search = document.getElementById('ingredient-search');
    const sort = document.getElementById('ingredient-sort');
    const status = document.getElementById('ingredient-results');

    if (!grid || !search || !sort || !status) return;

    let ingredients;

    try {
        const response = await fetch('data/ingredients.json');

        if (!response.ok) {
            throw new Error('Could not load ingredients JSON.');
        }

        ingredients = await response.json();

        if (!Array.isArray(ingredients) ||
            !ingredients.every(item =>
                item.name && item.image && Array.isArray(item.points))) {
            throw new Error('Ingredient data has an invalid format.');
        }
    } catch (error) {
        // Browser file:// restrictions or missing JSON: use existing HTML.
        const originalCards = [...grid.querySelectorAll('.power-card')];

        function filterStaticCards() {
            const query = search.value.trim().toLowerCase();
            const orderedCards = [...originalCards];

            if (sort.value === 'az' || sort.value === 'za') {
                orderedCards.sort((a, b) => {
                    const first = a.querySelector('h4')?.textContent.trim() || '';
                    const second = b.querySelector('h4')?.textContent.trim() || '';

                    return sort.value === 'az'
                        ? first.localeCompare(second)
                        : second.localeCompare(first);
                });
            }

            let count = 0;

            orderedCards.forEach(card => {
                const matches = card.textContent.toLowerCase().includes(query);
                card.hidden = !matches;

                if (matches) count++;
                grid.append(card);
            });

            status.textContent = `${count} ingredient${count === 1 ? '' : 's'} found (HTML fallback).`;
        }

        search.addEventListener('input', filterStaticCards);
        sort.addEventListener('change', filterStaticCards);
        filterStaticCards();

        console.info('BeeReady: displaying built-in ingredient cards.', error.message);
        return;
    }

    function buildIngredientCard(item) {
        const card = document.createElement('article');
        card.className = `power-card power-card-${item.tone === 'red' ? 'red' : 'yellow'}`;

        const icon = document.createElement('div');
        icon.className = 'ingredient-icon';

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        image.loading = 'lazy';

        icon.append(image);

        const heading = document.createElement('h4');
        heading.textContent = item.name.toUpperCase();

        const description = document.createElement('p');
        description.textContent = item.description || '';

        const points = document.createElement('ul');

        item.points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            points.append(li);
        });

        card.append(icon, heading, description, points);
        return card;
    }

    function renderIngredients() {
        const query = search.value.trim().toLowerCase();

        const visible = ingredients.filter(item =>
            [item.name, item.description || '', ...item.points]
                .join(' ').toLowerCase().includes(query));

        if (sort.value === 'az' || sort.value === 'za') {
            visible.sort((a, b) => sort.value === 'az'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name));
        }

        grid.replaceChildren(...visible.map(buildIngredientCard));

        status.textContent = `${visible.length} ingredient${visible.length === 1 ? '' : 's'} found.`;

        if (!visible.length) {
            const empty = document.createElement('p');
            empty.className = 'ingredient-empty';
            empty.textContent = 'No ingredients found. Try another search.';
            grid.append(empty);
        }
    }

    search.addEventListener('input', renderIngredients);
    sort.addEventListener('change', renderIngredients);
    renderIngredients();
}

/* =========================================================
   5. FORM VALIDATION AND AJAX - enquiry.html/contact.html
   Netlify form names: product-enquiry and general-contact.
   Netlify notifications are configured in the hosting dashboard.
   ========================================================= */

function initForms() {

    // Optional: only enable email-draft button after confirming the address.
    // Leave blank if email notifications will be sent via Netlify.
    const VERIFIED_BEEREADY_EMAIL = '';

    document.querySelectorAll('form[data-ajax-form]').forEach(form => {

        // Native HTML5 rules remain available without JavaScript.
        // With JS enabled, show custom error messages beside each field.
        form.noValidate = true;

        const fields = [...form.querySelectorAll(
            'input:not([type="hidden"]):not([name="bot-field"]), select, textarea'
        )];

        const status = form.querySelector('.form-status');
        const submit = form.querySelector('[type="submit"]');

        if (!status || !submit) return;

        const originalButtonText = submit.textContent;

        function showError(field, message) {
            const errorElement = document.getElementById(`${field.id}-error`);

            if (errorElement) errorElement.textContent = message;

            if (message) {
                field.setAttribute('aria-invalid', 'true');

                if (errorElement) {
                    field.setAttribute('aria-describedby', errorElement.id);
                }
            } else {
                field.removeAttribute('aria-invalid');
                field.removeAttribute('aria-describedby');
            }
        }

        function validateField(field) {
            const value = field.value.trim();
            let message = '';

            if (field.required && !value) {
                message = 'This field is required.';
            } else if (value && field.type === 'email' && !field.validity.valid) {
                message = 'Enter a valid email address.';
            } else if (value && field.type === 'tel' &&
                       (!field.validity.valid || value.replace(/\D/g, '').length < 7)) {
                message = 'Enter a valid phone number (at least 7 digits).';
            } else if (value && field.type === 'number' && !field.validity.valid) {
                message = 'Enter a valid whole number within the allowed range.';
            } else if (value && field.minLength > 0 && value.length < field.minLength) {
                message = `Enter at least ${field.minLength} characters.`;
            } else if (value && field.maxLength > 0 && value.length > field.maxLength) {
                message = `Enter no more than ${field.maxLength} characters.`;
            }

            showError(field, message);
            return message === '';
        }

        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('change', () => validateField(field));

            field.addEventListener('input', () => {
                if (field.hasAttribute('aria-invalid')) {
                    validateField(field);
                }
            });
        });

        // Optional email draft for the general Contact form only.
        const emailDraft = form.querySelector('[data-email-draft]');

        if (emailDraft && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(VERIFIED_BEEREADY_EMAIL)) {
            emailDraft.hidden = false;

            emailDraft.addEventListener('click', () => {
                let invalidField = null;

                fields.forEach(field => {
                    if (!validateField(field) && !invalidField) {
                        invalidField = field;
                    }
                });

                if (invalidField) {
                    invalidField.focus();
                    return;
                }

                const name = form.elements.namedItem('name').value.trim();
                const email = form.elements.namedItem('email').value.trim();
                const subject = form.elements.namedItem('subject').value.trim();
                const message = form.elements.namedItem('message').value.trim();

                const body = `From: ${name}\nReply-to: ${email}\nSubject: ${subject}\n\n${message}`;

                window.location.href = `mailto:${VERIFIED_BEEREADY_EMAIL}` +
                    `?subject=${encodeURIComponent('BeeReady: ' + subject)}` +
                    `&body=${encodeURIComponent(body)}`;
            });
        }

        form.addEventListener('submit', async event => {
            event.preventDefault();

            status.className = 'form-status';
            status.textContent = '';

            let firstInvalid = null;

            fields.forEach(field => {
                if (!validateField(field) && !firstInvalid) {
                    firstInvalid = field;
                }
            });

            if (firstInvalid) {
                status.className = 'form-status is-error';
                status.textContent = 'Please correct the highlighted fields.';
                firstInvalid.focus();
                return;
            }

            // A local preview is not a real Netlify submission.
            const localHost = ['localhost', '127.0.0.1', '[::1]'];

            if (window.location.protocol === 'file:' ||
                localHost.includes(window.location.hostname)) {

                status.className = 'form-status is-error';

                status.textContent = 'Form validation passed. To send this message, deploy the site to Netlify and enable form detection.';

                status.focus();
                return;
            }

            submit.disabled = true;
            submit.textContent = 'Sending...';
            status.textContent = 'Sending your message...';

            try {
                const formData = new FormData(form);
                const body = new URLSearchParams(formData).toString();

                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body
                });

                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }

                form.reset();

                fields.forEach(field => showError(field, ''));

                status.className = 'form-status is-success';
                status.textContent = 'The server accepted your form submission. Please verify the entry in your Netlify Forms dashboard.';

            } catch (error) {
                console.warn('BeeReady form submission error:', error);

                status.className = 'form-status is-error';

                status.textContent = 'Could not submit your message. Check the connection and Netlify Forms configuration, then try again.';

            } finally {
                submit.disabled = false;
                submit.textContent = originalButtonText;
                status.focus();
            }
        });
    });
}
