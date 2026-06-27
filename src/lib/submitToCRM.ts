export async function submitToCRM(
    formType: string,
    formData: Record<string, any>
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch('/api/crm/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formType, formData }),
        });
        if (!response.ok) {
            return { success: false, message: 'CRM API Error' };
        }
        const data = await response.json();
        return { success: !!data.success, message: data.message || 'Success' };
    } catch (error) {
        console.error('Error submitting to CRM API:', error);
        return {
            success: false,
            message: 'Failed to submit to CRM',
        };
    }
}
