function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;

    g_form.setReadOnly('apm_id', true);
    g_form.setReadOnly('ppm_id', true);
    g_form.setReadOnly('active_theme_admin_details', true);

    if (!newValue) {
        g_form.setValue('apm_id', '');
        return;
    }

    g_form.getReference('business_application', function(app) {
        if (!app) {
            g_form.setValue('apm_id', '');
            return;
        }

        var apmId = (app.apm_id || app.number || '').toString().trim();
        g_form.setValue('apm_id', apmId);
    });
}
