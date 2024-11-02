import { NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user.service';

const userService = new UserService();

export async function GET() {
  try {
    const users = await userService.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await userService.create(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}