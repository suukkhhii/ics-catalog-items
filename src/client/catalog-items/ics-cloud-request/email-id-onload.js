function onLoad() {
    g_form.setReadOnly('email_id', true);

    var requestedFor = (g_form.getValue('requested_for') || '').trim();
    if (!requestedFor) {
        return;
    }

    g_form.getReference('requested_for', function(requestedForUser) {
        if (!requestedForUser) {
            return;
        }

        var email = (requestedForUser.email || '').toString().trim();
        g_form.setValue('email_id', email);
    });
}
