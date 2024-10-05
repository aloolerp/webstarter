
import { ArrowUpRight } from 'lucide-react';

interface Card {
    title?: string;
    content?: string;
    image?: string;
    url?: string;
    label?: string;  // Label for the URL button
}

interface SectionWithCardProps {
    title?: string;
    subtitle?: string;
    card_size?: string;  // Size of the cards
    columns?: number;  // Number of columns for grid layout
    cards?: Card[];  // Array of cards
}

const SectionWithCard = ({ title, subtitle, card_size = 'h-60', columns = 3, cards = [] }: SectionWithCardProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            {title && (
                <h2 className="text-3xl font-bold mb-4 text-center">
                    {title}
                </h2>
            )}

            {/* Subtitle */}
            {subtitle && (
                <p className="text-lg text-muted-foreground mb-6 text-center">
                    {subtitle}
                </p>
            )}

            {/* Cards Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
                {cards.map((card, index) => (
                    <div key={index} className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ${card_size}`}>
                        {/* Card Image */}
                        {card.image && (
                            <div className="h-64 w-full mb-4 overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Card Title */}
                        {card.title && (
                            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        )}

                        {/* Card Content */}
                        {card.content && (
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{card.content}</p>
                        )}

                        {/* Card URL/Link */}
                        {card.url && card.label && (
                            <a
                            href={card.url}
                            className='flex items-center text-primary gap-2 text-sm font-medium  hover:text-black'
                        >
                            {card.label}
                            <ArrowUpRight className='w-4' />
                        </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionWithCard;
