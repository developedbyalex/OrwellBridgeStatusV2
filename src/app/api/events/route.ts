import { NextResponse } from 'next/server';
import { BridgeStatusRecord } from '@/types/bridge';
import { cache } from '@/lib/cache';

export async function GET() {
  try {
    const cachedEvents = cache.get<BridgeStatusRecord[] | {message: string}>('events-data');
    if (cachedEvents) {
      return NextResponse.json(cachedEvents);
    }

    let events: BridgeStatusRecord[] = [];
    try {
      const clientPromise = import('@/lib/mongodb').then(m => m.default);
      const client = await clientPromise;

      const db = client.db('paststatus');
      const collection = db.collection('bridgeevents');

      const records = await collection
        .find({ status: { $in: ['CLOSED', 'DELAYS', 'DELAYED'] } })
        .sort({ timestamp: -1 })
        .limit(5)
        .toArray();

      events = records.map((record) => ({
        _id: record._id.toString(),
        status: record.status,
        timestamp: record.timestamp.toISOString(),
        description: record.description,
        direction: record.direction,
        averageSpeed: record.averageSpeed,
        __v: record.__v || 0,
      }));


    } catch (dbError) {
      console.error('MongoDB error in events API:', dbError);
      const fallbackResponse = {
        message: "No closures or delays in the last 24 hours"
      };
      cache.set('events-data', fallbackResponse, 600);
      return NextResponse.json(fallbackResponse);
    }

    if (events.length === 0) {
      const responseData = {
        message: "No closures or delays in the last 24 hours"
      };
      cache.set('events-data', responseData, 600);
      return NextResponse.json(responseData);
    }

    cache.set('events-data', events, 600);
    return NextResponse.json(events);

  } catch (error) {
    console.error('Events API error:', error);

    return NextResponse.json([]);
  }
}