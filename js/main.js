(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // WhatsApp form submit
    var heliosWhatsAppNumber = '919380174938';

    function heliosGetField(form, name) {
        var field = form.querySelector('[name="' + name + '"]');
        if (!field) {
            return '';
        }
        return (field.value || '').trim();
    }

    function heliosOpenWhatsApp(message) {
        var url = 'https://wa.me/' + heliosWhatsAppNumber + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function heliosBuildContactMessage(form) {
        var message = '*Helios Electronics - Contact Inquiry*\n\n';
        message += 'Name: ' + heliosGetField(form, 'name') + '\n';
        message += 'Email: ' + heliosGetField(form, 'email') + '\n';
        message += 'Subject: ' + (heliosGetField(form, 'subject') || 'General Inquiry') + '\n\n';
        message += 'Message:\n' + heliosGetField(form, 'message');
        return message;
    }

    function heliosBuildQuoteMessage(form) {
        var message = '*Helios Electronics - RFQ / Quote Request*\n\n';
        message += 'Name: ' + heliosGetField(form, 'name') + '\n';
        message += 'Email: ' + heliosGetField(form, 'email') + '\n';
        message += 'Phone: ' + (heliosGetField(form, 'phone') || 'N/A') + '\n';
        message += 'Part Number: ' + heliosGetField(form, 'partnumber') + '\n';
        message += 'Manufacturer (MFR): ' + heliosGetField(form, 'mfr') + '\n';
        message += 'Quantity: ' + heliosGetField(form, 'quantity') + '\n';

        var notes = heliosGetField(form, 'message');
        if (notes) {
            message += '\nAdditional Requirements:\n' + notes;
        }

        return message;
    }

    $('.helios-whatsapp-form').on('submit', function (e) {
        e.preventDefault();

        var form = this;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var formType = $(form).data('form-type');
        var whatsappMessage = formType === 'quote'
            ? heliosBuildQuoteMessage(form)
            : heliosBuildContactMessage(form);

        heliosOpenWhatsApp(whatsappMessage);
    });
    
})(jQuery);

