import { http, HttpResponse, delay } from "msw";

const mockUser = {
  user: {
    id: "user_001",
    email: "admin@valpay.com",
    name: "Administrador Test",
    role: "admin" as const,
    commerceId: "comm_001",
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  session: {
    id: "session_001",
    expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    token: "mock_session_token_" + Date.now(),
    ip: "127.0.0.1",
    userAgent: "Mozilla/5.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const handlers = [
  http.get("/api/auth/get-session", async () => {
    await delay(200);
    return HttpResponse.json(mockUser);
  }),

  http.post("/api/auth/sign-in-email", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { email: string; password: string };
    if (body.email === "admin@valpay.com" && body.password === "admin123") {
      return HttpResponse.json(mockUser, { status: 200 });
    }
    return HttpResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }),

  http.post("/api/auth/sign-out", async () => {
    await delay(200);
    return HttpResponse.json({ status: true });
  }),

  http.post("/api/auth/sign-in/email", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { email: string; password: string };
    if (body.email === "admin@valpay.com" && body.password === "admin123") {
      return HttpResponse.json(mockUser, { status: 200 });
    }
    return HttpResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }),

  http.post("/api/auth/admin/has-permission", async ({ request }) => {
    await delay(200);
    const body = await request.json() as { permissions: Record<string, string[]>; role: string };
    const hasPermission = body.role === "maintainer" || body.role === "admin";
    return HttpResponse.json({ success: hasPermission });
  }),

  http.get("/api/v1/dashboard", async () => {
    await delay(300);
    return HttpResponse.json({
      stats: {
        totalCollected: 154320000,
        totalPending: 12500000,
        totalFailed: 3200000,
        transactionCount: 1245,
        invoiceCount: 89,
        currency: "COP",
      },
      recentTransactions: [
        {
          id: "txn_001",
          externalReference: "INV-2024-001",
          amount: 2500000,
          currency: "COP",
          status: "completed",
          createdAt: new Date().toISOString(),
        },
        {
          id: "txn_002",
          externalReference: "INV-2024-002",
          amount: 1800000,
          currency: "COP",
          status: "pending",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "txn_003",
          externalReference: "INV-2024-003",
          amount: 950000,
          currency: "COP",
          status: "failed",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    });
  }),

  http.get("/api/v1/dashboard/maintainer", async () => {
    await delay(300);
    return HttpResponse.json({
      stats: {
        totalVolume: 320000000,
        totalPending: 18000000,
        failedCount: 45,
        transactionCount: 3450,
        commerceCount: 28,
        adminCount: 12,
        currency: "COP",
      },
      recentTransactions: [
        {
          id: "txn_001",
          externalReference: "INV-2024-001",
          amount: 2500000,
          currency: "COP",
          status: "completed",
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }),

  http.get("/api/v1/transactions", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const transactions = Array.from({ length: 25 }, (_, i) => ({
      id: `txn_${String(i + 1).padStart(3, "0")}`,
      paymentId: `pay_${String(i + 1).padStart(3, "0")}`,
      provider: ["pse", "card", "cash"][i % 3] as "pse" | "card" | "cash",
      status: (["pending", "completed", "failed"][i % 3]) as "pending" | "completed" | "failed",
      bankCode: i % 3 === 0 ? "001" : undefined,
      bankName: i % 3 === 0 ? "Banco de Colombia" : undefined,
      amount: Math.floor(Math.random() * 5000000) + 100000,
      currency: "COP",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    }));

    const start = (page - 1) * limit;
    const paginatedData = transactions.slice(start, start + limit);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: transactions.length,
        page,
        limit,
      },
    });
  }),

  http.get("/api/v1/transactions/:id", async ({ params }) => {
    await delay(300);
    const id = params.id as string;
    return HttpResponse.json({
      id,
      paymentId: `pay_${id.slice(-3)}`,
      provider: "pse" as const,
      status: "completed" as const,
      bankCode: "001",
      bankName: "Banco de Colombia",
      amount: 2500000,
      currency: "COP",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  http.get("/api/v1/commerces", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const commerces = Array.from({ length: 15 }, (_, i) => ({
      id: `comm_${String(i + 1).padStart(3, "0")}`,
      name: `Comercio ${i + 1}`,
      document: `900${String(i + 1).padStart(6, "0")}`,
      email: `comercio${i + 1}@ejemplo.com`,
      phone: `+57${String(3000000000 + i * 1000000)}`,
      status: (["active", "inactive", "suspended"][i % 3]) as "active" | "inactive" | "suspended",
      createdAt: new Date(Date.now() - i * 86400000 * 30).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000 * 10).toISOString(),
    }));

    const start = (page - 1) * limit;
    const paginatedData = commerces.slice(start, start + limit);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: commerces.length,
        page,
        limit,
      },
    });
  }),

  http.get("/api/v1/commerces/:id", async ({ params }) => {
    await delay(300);
    const { id } = params;
    return HttpResponse.json({
      id,
      name: "Comercio de Ejemplo",
      document: "900123456",
      email: "ejemplo@comercio.com",
      phone: "+573000000000",
      status: "active" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  http.post("/api/v1/commerces", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { name: string; document: string; email: string; phone?: string };
    return HttpResponse.json({
      id: `comm_${Date.now()}`,
      ...body,
      status: "active" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  http.patch("/api/v1/commerces/:id", async ({ params, request }) => {
    await delay(300);
    const id = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  http.delete("/api/v1/commerces/:id", async () => {
    await delay(300);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("/api/v1/api-keys", async () => {
    await delay(300);
    return HttpResponse.json({
      data: [
        {
          id: "key_001",
          name: "Clave de Producción",
          keyPrefix: "sk_live_****",
          status: "active" as const,
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          lastUsedAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "key_002",
          name: "Clave de Prueba",
          keyPrefix: "sk_test_****",
          status: "active" as const,
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
        {
          id: "key_003",
          name: "Clave Vieja",
          keyPrefix: "sk_live_****",
          status: "revoked" as const,
          createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
          revokedAt: new Date(Date.now() - 86400000 * 60).toISOString(),
        },
      ],
    });
  }),

  http.post("/api/v1/api-keys", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { name: string };
    const id = `key_${Date.now()}`;
    return HttpResponse.json({
      apiKey: {
        id,
        name: body.name,
        keyPrefix: "sk_test_****",
        status: "active" as const,
        createdAt: new Date().toISOString(),
      },
      secret: `sk_test_${Date.now()}_abcdef`,
    }, { status: 201 });
  }),

  http.post("/api/v1/api-keys/:id/revoke", async ({ params }) => {
    await delay(300);
    const { id } = params;
    return HttpResponse.json({
      id,
      status: "revoked" as const,
      revokedAt: new Date().toISOString(),
    });
  }),

  http.get("/api/v1/admins", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const admins = Array.from({ length: 8 }, (_, i) => ({
      id: `admin_${String(i + 1).padStart(3, "0")}`,
      name: `Administrador ${i + 1}`,
      email: `admin${i + 1}@valpay.com`,
      role: i === 0 ? "maintainer" as const : "admin" as const,
      status: "active" as const,
      commerceId: i > 0 ? `comm_${String(i).padStart(3, "0")}` : undefined,
      commerceName: i > 0 ? `Comercio ${i}` : undefined,
      createdAt: new Date(Date.now() - i * 86400000 * 30).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000 * 10).toISOString(),
    }));

    const start = (page - 1) * limit;
    const paginatedData = admins.slice(start, start + limit);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: admins.length,
        page,
        limit,
      },
    });
  }),

  http.get("/api/v1/admins/:id", async ({ params }) => {
    await delay(300);
    const { id } = params;
    return HttpResponse.json({
      id,
      name: "Administrador de Ejemplo",
      email: "admin@valpay.com",
      role: "admin" as const,
      status: "active" as const,
      commerceId: "comm_001",
      commerceName: "Comercio 1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  http.post("/api/v1/admins", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { name: string; email: string; password: string; role: "admin" | "maintainer"; commerceId?: string };
    return HttpResponse.json({
      id: `admin_${Date.now()}`,
      ...body,
      status: "active" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  http.patch("/api/v1/admins/:id", async ({ params, request }) => {
    await delay(300);
    const id = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  http.get("/api/v1/invoices", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const invoices = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      externalId: `INV-2024-${String(i + 1).padStart(4, "0")}`,
      subject: `Pago factura #${i + 1}`,
      metadata: {},
      amount: Math.floor(Math.random() * 5000000) + 100000,
      currency: "COP",
      receiverName: "Comercio Test",
      receiverId: "900123456",
      senderDocument: "1234567890",
      senderName: "Juan Pérez",
      senderEmail: "juan@email.com",
      senderPhone: "3001234567",
      status: (["pending", "paid", "failed"][i % 3]) as "pending" | "paid" | "failed",
      paymentId: undefined,
      createdAt: new Date(Date.now() - i * 86400000 * 7).toISOString(),
      updatedAt: new Date(Date.now() - i * 86400000 * 7).toISOString(),
    }));

    const start = (page - 1) * limit;
    const paginatedData = invoices.slice(start, start + limit);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: invoices.length,
        page,
        limit,
      },
    });
  }),

  http.get("/api/v1/invoices/:id", async ({ params }) => {
    await delay(300);
    const id = params.id as string;
    return HttpResponse.json({
      id,
      externalId: `INV-2024-${id.padStart(4, "0")}`,
      subject: "Pago de servicio de consultoría",
      metadata: { orderId: "12345" },
      amount: 2500000,
      currency: "COP",
      receiverName: "Comercio Test",
      receiverId: "900123456",
      senderDocument: "1234567890",
      senderName: "Juan Pérez",
      senderEmail: "juan@email.com",
      senderPhone: "3001234567",
      status: "pending" as const,
      paymentId: undefined,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    });
  }),

  http.post("/api/v1/invoices", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { 
      externalId?: string; 
      subject?: string; 
      amount: number; 
      currency: string; 
      description?: string;
      receiverId: string; 
      senderDocument: string; 
      senderName: string; 
      senderEmail?: string;
      senderPhone?: string;
    };
    const id = String(Math.floor(Math.random() * 10000) + 100);
    return HttpResponse.json({
      id,
      externalId: body.externalId || `INV-${Date.now()}`,
      subject: body.subject || body.description || "Nueva factura",
      metadata: {},
      amount: body.amount,
      currency: body.currency || "COP",
      receiverName: "Comercio Test",
      receiverId: body.receiverId,
      senderDocument: body.senderDocument,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderPhone: body.senderPhone,
      status: "pending" as const,
      paymentId: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  http.get("/api/v1/pse-banks", async () => {
    await delay(300);
    return HttpResponse.json({
      data: [
        { code: "001", name: "Banco de Colombia", brand: "bancolombia" },
        { code: "002", name: "Banco de Bogotá", brand: "bogota" },
        { code: "003", name: "Banco Popular", brand: "popular" },
        { code: "004", name: "Banco Itaú", brand: "itau" },
        { code: "005", name: "Banco AV Villas", brand: "avvillas" },
        { code: "006", name: "Banco Santander", brand: "santander" },
        { code: "007", name: "Banco Citibank", brand: "citibank" },
        { code: "008", name: "Banco Scotiabank", brand: "scotiabank" },
        { code: "009", name: "Banco BBVA", brand: "bbva" },
        { code: "010", name: "Banco GNB Sudameris", brand: "gnb" },
      ],
    });
  }),

  http.post("/api/v1/payments", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { 
      invoiceId: string | number; 
      currencyCode?: string; 
      amount?: number;
      method?: string;
    };
    
    // Si viene del frontend (con method, sin amount/currencyCode)
    if (body.method && !body.amount) {
      return HttpResponse.json({
        id: `pay_${Date.now()}`,
        invoiceId: body.invoiceId,
        amount: 2500000,
        currency: "COP",
        status: "pending",
        method: body.method,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { status: 201 });
    }
    
    // Si viene de la nueva API
    const id = typeof body.invoiceId === 'string' ? Number(body.invoiceId) : body.invoiceId;
    return HttpResponse.json({
      id,
      amount: body.amount || 2500000,
      currency: body.currencyCode || "COP",
      status: "PENDING",
      requestAt: new Date().toISOString(),
    }, { status: 201 });
  }),

  // Mantener /transactions para compatibilidad con frontend actual
  http.post("/api/v1/transactions", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { 
      paymentId?: string | number; 
      bankCode?: string; 
      returnUrl?: string;
      // Nuevos campos de la API
      providerCode?: string;
      amount?: number;
      identificationType?: string;
      identificationNumber?: string;
      fullName?: string;
      email?: string;
      phoneNumber?: string;
      address?: string;
    };
    
    // Si viene del frontend antiguo (con paymentId)
    if (body.paymentId) {
      const transactionId = Math.floor(Math.random() * 10000) + 100;
      return HttpResponse.json({
        id: String(transactionId),
        paymentId: body.paymentId,
        redirectUrl: `https://pse-test.com/pay?token=${Date.now()}`,
      }, { status: 201 });
    }
    
    // Si viene de la nueva API
    const transactionId = Math.floor(Math.random() * 10000) + 100;
    return HttpResponse.json({
      status: "PENDING",
      amount: body.amount || 2500000,
      gatewayUrl: `https://pse-test.com/pay?token=${Date.now()}`,
      externalId: `TRAZ-${Date.now()}`,
      requestAt: new Date().toISOString(),
      transactionId,
      paymentId: body.paymentId,
    }, { status: 201 });
  }),

  // Endpoint nuevo /transactions/intent
  http.post("/api/v1/transactions/intent", async ({ request }) => {
    await delay(300);
    const body = await request.json() as { 
      paymentId: number; 
      providerCode: string; 
      amount: number; 
      identificationType: string; 
      identificationNumber: string; 
      bankCode?: string; 
      fullName: string; 
      email: string; 
      phoneNumber: string; 
      address: string; 
    };
    const transactionId = Math.floor(Math.random() * 10000) + 100;
    return HttpResponse.json({
      status: "PENDING",
      amount: body.amount,
      gatewayUrl: `https://pse-test.com/pay?token=${Date.now()}`,
      externalId: `TRAZ-${Date.now()}`,
      requestAt: new Date().toISOString(),
      transactionId,
      paymentId: body.paymentId,
    }, { status: 201 });
  }),

  http.get("/api/v1/transactions/:id/confirm", async ({ params }) => {
    await delay(300);
    const id = params.id;
    return HttpResponse.json({
      invoiceNumber: Number(id),
      status: "SUCCESS",
      amount: 2500000,
      externalId: `TRAZ-${id}`,
    });
  }),

  http.get("/api/v1/transactions/:id/events", async ({ params }) => {
    await delay(300);
    const id = params.id;
    return HttpResponse.json({
      event: "status_update",
      transactionId: id,
      status: "SUCCESS",
      timestamp: new Date().toISOString(),
    });
  }),
];
