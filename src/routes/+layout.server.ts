import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals, getClientAddress})  => {
    const user = locals.user
    const clientIp = getClientAddress()
    const countryResponse = await fetch(`https://api.country.is/${clientIp}`)
    const {country}: {country: string} = await countryResponse.json()

    return {
        user,
        country
    }
}
