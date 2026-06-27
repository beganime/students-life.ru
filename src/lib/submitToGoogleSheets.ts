export async function submitToGoogleSheets(
    formType: string,
    formData: Record<string, any>
): Promise<{ success: boolean; message: string }> {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    if (!scriptUrl) {
        console.error('Google Sheets URL not configured');
        return {
            success: false,
            message: 'Configuration error. Please contact support.',
        };
    }
    try {
        const valueMapping: Record<string, string> = {
            'university': 'Для абитуриентов',
            'transfer': 'Для переводников',
            'school': 'Для школьников в Китай',
            'umrah': 'Умра в Мекку',
            'workVisa': 'Рабочая виза',
            'ticket': 'Покупка билета',
            'University': 'Для абитуриентов',
            'Transfer': 'Для переводников',
            'School': 'Для школьников в Китай',
            'Umrah': 'Умра в Мекку',
            'Work Visa': 'Рабочая виза',
            'Ticket': 'Покупка билета',
            'General Inquiry': 'Общий запрос',
            'language': 'Языковые курсы',
            'preparatory': 'Подготовительный факультет',
            'bachelor': 'Бакалавриат',
            'master': 'Магистратура',
            'paid': 'Платное обучение',
            'grant': 'Грант/Бюджет',
            'self': 'Сам(а)',
            'father': 'Отец',
            'mother': 'Мать',
            'friend': 'Друг/Знакомый',
            'yes': 'Да',
            'no': 'Нет',
            'yesBaggage': 'С багажом',
            'noBaggage': 'Без багажа',
            'Turkmenistan': 'Туркменистан',
            'China': 'Китай',
            'Turkey': 'Турция',
            'Uzbekistan': 'Узбекистан',
            'Tajikistan': 'Таджикистан',
            'Russia': 'Россия',
            'Kazakhstan': 'Казахстан',
            'Kyrgyzstan': 'Киргизия',
            'Afghanistan': 'Афганистан',
            'Iran': 'Иран',
            'Belarus': 'Беларусь',
            'Cyprus': 'Кипр',
            'Europe': 'Европа',
            'Lebap': 'Лебап',
            'Mary': 'Мары',
            'Dashoguz': 'Дашогуз',
            'Balkan': 'Балкан',
            'Ahal': 'Ахал',
            'Ashgabat': 'Ашхабад',
            'same': 'В той же стране',
            'different': 'В другую страну',
            'call': 'Звонок',
            'whatsapp': 'WhatsApp',
            'telegram': 'Telegram',
            'email': 'Email'
        };
        const mapValue = (val: any) => {
            if (typeof val !== 'string') return val;
            return valueMapping[val] || val;
        };
        const mappedData = {
            'Тип формы': mapValue(formType),
            'ФИО': formData.fullName || formData.name,
            'Телефон': formData.phone,
            'Email': formData.email,
            'Дата рождения': formData.dateOfBirth,
            'Степень родства': mapValue(formData.relationship),
            'Гражданство': mapValue(formData.citizenship),
            'Регион': mapValue(formData.region),
            'Город': formData.city,
            'Уровень образования': mapValue(formData.educationLevel),
            'Страна назначения': mapValue(formData.targetCountry),
            'Направление обучения': formData.fieldOfStudy,
            'ФИО студента': formData.studentName,
            'ФИО родителя': formData.parentName,
            'Наличие паспорта': mapValue(formData.hasPassport),
            'Срок действия паспорта': formData.passportExpiry,
            'Месяц поездки': mapValue(formData.travelMonth),
            'Город вылета': formData.fromCity,
            'Город прибытия': formData.toCity,
            'Дата поездки': formData.travelDate,
            'Способ связи': mapValue(formData.preference),
            'Багаж': mapValue(formData.needsBaggage),
            'Текущее образование': mapValue(formData.currentEducationLevel),
            'Текущий университет': formData.currentUniversity,
            'Текущая страна': mapValue(formData.currentCountry),
            'Текущая специальность': formData.currentField,
            'Способ оплаты': mapValue(formData.paymentType),
            'Тип перевода': mapValue(formData.transferType),
            'Целевой университет': formData.targetUniversity,
            'Целевая специальность': formData.targetField,
            'Предпочтения по работе': formData.workPreferences,
            'История поездок': formData.previousTravel,
            ...Object.keys(formData).reduce((acc: any, key) => {
                acc[key] = mapValue(formData[key]);
                return acc;
            }, {})
        };
        const dataToSend = {
            timestamp: new Date().toISOString(),
            ...mappedData,
        };
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        return {
            success: true,
            message: 'Form submitted successfully!',
        };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return {
            success: false,
            message: 'Failed to submit form. Please try again.',
        };
    }
}
