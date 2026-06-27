import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { formType, formData } = body;
        const apiKey = process.env.CRM_API_KEY;
        if (!apiKey) {
            console.error('CRM_API_KEY is not defined in environment variables');
            return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
        }
        const directionMapping: Record<string, string | null> = {
            'university': 'admission',
            'University': 'admission',
            'transfer': 'translation',
            'Transfer': 'translation',
            'school': 'admission',
            'School': 'admission',
            'umrah': 'umrah',
            'Umrah': 'umrah',
            'workVisa': 'work_visa',
            'Work Visa': 'work_visa',
            'ticket': 'tickets',
            'Ticket': 'tickets',
            'General Inquiry': null,
            'Лид-магнит': 'admission',
        };
        const direction = directionMapping[formType];
        if (direction === undefined || direction === null) {
            return NextResponse.json({ success: true, message: 'Ignored' });
        }
        let age = null;
        if (formData.dateOfBirth) {
            const dob = new Date(formData.dateOfBirth);
            const diffMs = Date.now() - dob.getTime();
            const ageDate = new Date(diffMs);
            age = Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        const crmPayload = {
            ...formData,
            full_name: formData.fullName || formData.name,
            phone: formData.phone,
            email: formData.email,
            country: formData.citizenship,
            education: formData.educationLevel || formData.currentEducationLevel,
            age: age,
            relation: formData.relationship,
            direction: direction,
        };
        delete crmPayload.fullName;
        delete crmPayload.name;
        delete crmPayload.citizenship;
        delete crmPayload.educationLevel;
        delete crmPayload.currentEducationLevel;
        delete crmPayload.relationship;
        delete crmPayload.dateOfBirth;
        const cleanPayload = Object.fromEntries(
            Object.entries(crmPayload).filter(([_, v]) => v != null && v !== '')
        );
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const crmResponse = await fetch('https://manager-sl.ru/api/leads/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: JSON.stringify(cleanPayload),
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!crmResponse.ok) {
            let errorText = '';
            try {
                errorText = await crmResponse.text();
            } catch (e) {
                errorText = 'Could not read error text';
            }
            console.error(`CRM API Error (${crmResponse.status}):`, errorText);
            return NextResponse.json({ success: false, message: 'CRM API Error' }, { status: crmResponse.status });
        }
        await crmResponse.json();
        return NextResponse.json({ success: true, message: 'Success' });
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('CRM API Timeout');
            return NextResponse.json({ success: false, message: 'Timeout' }, { status: 504 });
        }
        console.error('CRM API Exception:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
