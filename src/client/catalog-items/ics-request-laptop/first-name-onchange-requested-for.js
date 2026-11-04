function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || !newValue) {
        return;
    }

    g_form.getReference('requested_for', function(requestedForUser) {
        if (!requestedForUser) {
            return;
        }

        var firstName = (requestedForUser.first_name || '').toString().trim();
        if (firstName) {
            g_form.setValue('first_name', firstName);
        }
    });
}
