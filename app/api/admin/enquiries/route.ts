import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { verifyToken } from '@/utils/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let query = 'SELECT * FROM enquiries';
        let conditions = [];
        let values = [];

        if (startDate) {
            conditions.push(`created_at >= $${values.length + 1}`);
            values.push(`${startDate}T00:00:00`);
        }
        if (endDate) {
            conditions.push(`created_at <= $${values.length + 1}`);
            values.push(`${endDate}T23:59:59`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const res = await pool.query(query, values);
        return NextResponse.json(res.rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
