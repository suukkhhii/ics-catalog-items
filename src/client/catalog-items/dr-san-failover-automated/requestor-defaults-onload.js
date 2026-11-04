function onLoad() {
    var isEmpty = function(v) { return !(v || '').toString().trim(); };

    if (typeof g_user !== 'undefined') {
        if (isEmpty(g_form.getValue('requestor_anz_email'))) {
            g_form.setValue('requestor_anz_email', (g_user.email || '').toString());
        }
        if (isEmpty(g_form.getValue('requestor_role'))) {
            var roleValue = '';
            if (typeof g_user.getUserRoles === 'function') {
                var roles = g_user.getUserRoles();
                roleValue = (roles || '').toString().split(',')[0] || '';
            }
            g_form.setValue('requestor_role', roleValue);
        }
    }

    g_form.setReadOnly('requestor_anz_email', true);
    g_form.setReadOnly('requestor_role', true);
    g_form.setReadOnly('requestor_department', true);
    g_form.setReadOnly('apm_id', true);
    g_form.setReadOnly('ppm_id', true);
    g_form.setReadOnly('active_theme_admin_details', true);
}
