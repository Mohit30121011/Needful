import Image from 'next/image'
import { Star, ThumbsUp } from 'lucide-react'

const movies = [
    { title: 'The Fall Guy', rating: '88%', votes: '12K', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400' },
    { title: 'Civil War', rating: '74%', votes: '8K', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400' },
    { title: 'Challengers', rating: '92%', votes: '5K', img: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=400' },
    { title: 'Monkey Man', rating: '81%', votes: '15K', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400' },
]

export function EntertainmentSection() {
    return (
        <section className="py-8 bg-white reveal">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Latest Movies & Reviews</h2>
                    <span className="text-sm font-semibold text-primary cursor-pointer hover:underline">View All</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movies.map((movie, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all">
                                <Image src={movie.img} alt={movie.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3 text-green-400" /> {movie.rating}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors truncate">{movie.title}</h3>
                            <p className="text-xs text-gray-500">{movie.votes} votes</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
