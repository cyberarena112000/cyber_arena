export interface Tool {
    id: string;
    name: string;
    category: string;
    team: "Red" | "Blue";
    level: string;
    description: string;
    use_cases: string[];
    actionLabel?: string;
    icon?: string;
}

export const tools: Tool[] = [
    {
        id: "burp-suite",
        name: "Burp Suite",
        category: "Web Security",
        team: "Red",
        level: "Beginner",
        description: "Intercept and analyze HTTP traffic",
        use_cases: ["Web testing", "Session analysis"],
    },
    {
        id: "web-crawler",
        name: "Web Crawler",
        category: "Web Tools",
        team: "Red",
        level: "Intermediate",
        description: "Crawl and map website structure, discovering pages and resources.",
        use_cases: ["Reconnaissance", "Site Mapping"],
        actionLabel: "Start Crawling",
        icon: "🕷️",
    },
    {
        id: "vuln-scanner",
        name: "Vulnerability Scanner",
        category: "Web Tools",
        team: "Red",
        level: "Advanced",
        description: "Scan web applications for common vulnerabilities and security issues.",
        use_cases: ["Automated Scanning", "Vulnerability Assessment"],
        actionLabel: "Start Scan",
        icon: "🛡️",
    },
    {
        id: "subdomain-enum",
        name: "Subdomains Enumeration",
        category: "Web Tools",
        team: "Red",
        level: "Intermediate",
        description: "Discover subdomains associated with a target domain.",
        use_cases: ["Reconnaissance", "Asset Discovery"],
        actionLabel: "Find Subdomains",
        icon: "🔍",
    },
    {
        id: "dir-enum",
        name: "Directory Enumeration",
        category: "Web Tools",
        team: "Red",
        level: "Intermediate",
        description: "Discover hidden directories and files on web servers.",
        use_cases: ["Reconnaissance", "Content Discovery"],
        actionLabel: "Start Enumeration",
        icon: "📂",
    },
];
