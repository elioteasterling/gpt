export async function asks(question: string, token = '', url = '/') {
    const body = question.trim().toLowerCase()
    if (!question) throw new Error('An empty question is being asked')
    try {
        const authId = `Bearer ${token}`
        const headers: Record<string, string> = { 'Content-Type': 'application/json'}
        if (token) headers['Authorization'] = authId
        const res = await fetch(url, { headers, body, method: 'POST' })
        return await res.json()
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}