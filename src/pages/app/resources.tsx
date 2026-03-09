import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const categoryColors: Record<string, { bg: string; text: string; activeBg: string }> = {
  "See All": { bg: "bg-neutral-100", text: "text-neutral-700", activeBg: "bg-neutral-700 text-white" },
  "Talking Points": { bg: "bg-blue-100", text: "text-blue-700", activeBg: "bg-blue-600 text-white" },
  "Canvassing": { bg: "bg-green-100", text: "text-green-700", activeBg: "bg-green-600 text-white" },
  "Phone Banking": { bg: "bg-purple-100", text: "text-purple-700", activeBg: "bg-purple-600 text-white" },
  "Voter Registration": { bg: "bg-cyan-100", text: "text-cyan-700", activeBg: "bg-cyan-600 text-white" },
  "Social Media": { bg: "bg-pink-100", text: "text-pink-700", activeBg: "bg-pink-600 text-white" },
  "Fundraising": { bg: "bg-amber-100", text: "text-amber-700", activeBg: "bg-amber-600 text-white" },
  "Legal & Compliance": { bg: "bg-red-100", text: "text-red-700", activeBg: "bg-red-600 text-white" },
}

const categories = Object.keys(categoryColors)

interface Resource {
  id: string
  title: string
  category: string
  image: string
}

const resources: Resource[] = [
  {
    id: "r1",
    title: "Infrastructure Bill Talking Points",
    category: "Talking Points",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=80",
  },
  {
    id: "r2",
    title: "Healthcare Policy Overview",
    category: "Talking Points",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: "r3",
    title: "Door-to-Door Canvassing Guide",
    category: "Canvassing",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    id: "r4",
    title: "Canvassing Script Templates",
    category: "Canvassing",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    id: "r5",
    title: "Phone Bank Best Practices",
    category: "Phone Banking",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
  },
  {
    id: "r6",
    title: "Call Script Builder Kit",
    category: "Phone Banking",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=600&q=80",
  },
  {
    id: "r7",
    title: "Voter Registration Compliance Guide",
    category: "Voter Registration",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80",
  },
  {
    id: "r8",
    title: "Registration Drive Toolkit",
    category: "Voter Registration",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=600&q=80",
  },
  {
    id: "r9",
    title: "Social Media Content Calendar",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    id: "r10",
    title: "Platform-Specific Posting Guide",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&q=80",
  },
  {
    id: "r11",
    title: "Small-Dollar Fundraising Playbook",
    category: "Fundraising",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  },
  {
    id: "r12",
    title: "Event Fundraiser Planning Kit",
    category: "Fundraising",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
  },
  {
    id: "r13",
    title: "Campaign Finance Reporting Guide",
    category: "Legal & Compliance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  },
  {
    id: "r14",
    title: "Election Law Quick Reference",
    category: "Legal & Compliance",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
]

function CategoryBadge({ category, isActive, onClick }: { category: string; isActive: boolean; onClick: () => void }) {
  const colors = categoryColors[category]
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0 cursor-pointer ${
        isActive ? colors.activeBg : `${colors.bg} ${colors.text} hover:opacity-80`
      }`}
    >
      {category}
    </button>
  )
}

function ResourceCard({ resource, showCategory }: { resource: Resource; showCategory: boolean }) {
  const colors = categoryColors[resource.category]
  return (
    <div className="cursor-pointer group">
      <div className="relative">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full aspect-video object-cover rounded-xl"
        />
        <div className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm group-hover:bg-primary transition-colors">
          <ArrowUpRight className="size-4" />
        </div>
      </div>
      <div className="pt-2.5 px-0.5">
        <h3 className="text-sm font-medium leading-snug">{resource.title}</h3>
        {showCategory && (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1.5 ${colors.bg} ${colors.text}`}>
            {resource.category}
          </span>
        )}
      </div>
    </div>
  )
}

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("See All")

  const filtered = activeCategory === "See All"
    ? resources
    : resources.filter((r) => r.category === activeCategory)

  const featured = filtered.slice(0, 2)
  const rest = filtered.slice(2)

  return (
    <div className="flex flex-col gap-6 p-4 pt-0">
      <h1 className="text-2xl font-bold">Resources</h1>

      {/* Category filter bar */}
      <div className="flex items-center gap-2">
        <CategoryBadge
          category="See All"
          isActive={activeCategory === "See All"}
          onClick={() => setActiveCategory("See All")}
        />
        <div className="h-6 w-px bg-border shrink-0" />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.filter((c) => c !== "See All").map((cat) => (
            <CategoryBadge
              key={cat}
              category={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Featured cards - 2 column */}
      {featured.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              showCategory={activeCategory === "See All"}
            />
          ))}
        </div>
      )}

      {/* Remaining cards - 4 column */}
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rest.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              showCategory={activeCategory === "See All"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
