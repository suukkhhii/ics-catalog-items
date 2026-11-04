function onLoad() {
    var existingValue = (g_form.getValue('first_name') || '').trim();
    if (existingValue) {
        return;
    }

    if (typeof g_user === 'undefined') {
        return;
    }

    var firstName = '';
    if (typeof g_user.firstName === 'string') {
        firstName = g_user.firstName;
    } else if (typeof g_user.getFirstName === 'function') {
        firstName = g_user.getFirstName();
    }

    firstName = (firstName || '').trim();
    if (firstName) {
        g_form.setValue('first_name', firstName);
    }
}
