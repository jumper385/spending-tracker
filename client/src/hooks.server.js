import { vars } from '$lib/vars'
import Pocketbase from 'pocketbase'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.pocketbase = new Pocketbase(vars.dbUrl)

    event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    const response = await resolve(event)

    response.headers.set('set-cookie', event.locals.pocketbase.authStore.exportToCookie())
    
    return response
}