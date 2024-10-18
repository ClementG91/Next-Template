import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (!url) {
    return new Response('URL parameter is missing', { status: 400 });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const proxyUrl = new URL(decodedUrl);
    const res = await fetch(proxyUrl.toString());
    const contentType = res.headers.get('content-type');

    return new Response(res.body, {
      headers: {
        'Content-Type': contentType || 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new Response('Error proxying image', { status: 500 });
  }
}
