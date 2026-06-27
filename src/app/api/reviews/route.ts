import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, city, service, rating, content } = body;

    if (!name || !rating || !content) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    const res = await fetch(`${strapiUrl}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { name, city, service, rating, content }, status: 'draft' }),
    });

    if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error('Strapi review POST failed:', res.status, errBody);
        return NextResponse.json({ error: 'Submission failed', strapiStatus: res.status, detail: errBody }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
}
