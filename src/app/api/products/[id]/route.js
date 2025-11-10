import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/db';


export async function GET(_req, { params }) {
const p = getProduct(params.id);
return p ? NextResponse.json(p) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}