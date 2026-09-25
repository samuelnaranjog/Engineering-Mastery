export const initialArticles = [
    {
        id: 1,
        title: "Understanding Ephemeral Diffie-Hellman Key Exchange",
        content: "TLS 1.3 relies heavily on ECDHE to establish shared secrets across untrusted networks, ensuring forward secrecy by discarding session keys after termination.",
        owner: "alpha",
    },
    {
        id: 2,
        title: "Mitigating Token Exfiltration via HttpOnly Cookies",
        content: "Storing credentials in HttpOnly, SameSite=Strict cookies prevents malicious client-side JavaScript from accessing session data via document.cookie during an XSS exploit.",
        owner: "alpha",
    },
    {
        id: 3,
        title: "ES6 Map vs Plain Object Lookups in Node.js",
        content: "While object literals work well for static records, Map provides optimized garbage collection, preserved insertion order, and collision resistance for dynamic key-value pairs.",
        owner: "beta",
    },
    {
        id: 4,
        title: "Architecting In-Memory State for Local Testing",
        content: "Using isolated in-memory stores allows developers to test CRUD operations, pagination, and filter logic without spinning up external database containers.",
        owner: "beta",
    },
];
//# sourceMappingURL=articles.entity.js.map