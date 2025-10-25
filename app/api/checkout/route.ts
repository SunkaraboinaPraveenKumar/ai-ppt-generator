export async function POST(request: Request) {
  try {
    const { plan } = await request.json()

    if (!plan || !["pro", "enterprise"].includes(plan)) {
      return Response.json({ error: "Invalid plan" }, { status: 400 })
    }

    // In a real app, this would create a Stripe checkout session
    // For now, we'll return a mock response
    const checkoutUrl = `/checkout/${plan}`

    return Response.json({ checkoutUrl })
  } catch (error) {
    console.error("Error creating checkout:", error)
    return Response.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
