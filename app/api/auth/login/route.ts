import { NextResponse } from 'next/server';
import { signToken } from '@/utils/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@k10.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = await signToken({ email });
            const response = NextResponse.json({ success: true });

            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
