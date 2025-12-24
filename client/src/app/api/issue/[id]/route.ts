import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-config';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query, where, getDocs,
} from "firebase/firestore";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    // Query the issues collection by the "id" field of the document, not the Firestore document ID
    const issuesRef = collection(db, 'issues');
    const q = query(issuesRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    // Return the first matched document
    const docSnap = querySnapshot.docs[0];
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });
  } catch (error) {
    // Do not use 'any', let TypeScript infer the type
    return NextResponse.json({ error: (error as Error)?.message ?? 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data || !data.id || !data.category || !data.description || !data.status || !data.severity || !data.date) {
      return NextResponse.json({ error: "Missing data parameters" }, { status: 400 });
    }
    // Create a new document with a generated id in 'issues' collection
    const docRef = await addDoc(collection(db, 'issues'), {
      id: data.id,
      category: data.category,
      description: data.description,
      status: data.status,
      severity: data.severity,
      date: data.date,
    });
    const savedDocSnap = await getDoc(docRef);
    return NextResponse.json(
      { message: 'Issue received', issue: { id: docRef.id, ...savedDocSnap.data() } }, { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save issue' }, { status: 500 });
  }
}
