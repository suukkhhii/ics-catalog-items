function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    g_form.setReadOnly('email_id', true);

    if (!newValue) {
        g_form.setValue('email_id', '');
        return;
    }

    g_form.getReference('requested_for', function(requestedForUser) {
        if (!requestedForUser) {
            g_form.setValue('email_id', '');
            return;
        }

        var email = (requestedForUser.email || '').toString().trim();
        g_form.setValue('email_id', email);
    });
}
