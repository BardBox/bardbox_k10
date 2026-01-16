import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, budget, property_type, message } = body;

        const query = `
            INSERT INTO enquiries (name, phone, email, budget, property_type, message)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [name, phone, email, budget, property_type, message];

        const res = await pool.query(query, values);

        return NextResponse.json({ success: true, data: res.rows[0] });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
