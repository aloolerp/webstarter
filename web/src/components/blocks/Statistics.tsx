interface StatisticsProps {
            title?: string;
        subtitle?: string;

        stats?: Array<StatisticsItemProps>;
        }

        interface StatisticsItemProps {
                quantity?: string;
        description?: string;

        }
        
    const Statistics = ({ title, subtitle, stats }: StatisticsProps) => {
        return (
            <section className="bg-muted/50  my-24 sm:my-32">
            <div>
    
                    { title && (
                        <div>
                            <p>{ title }</p>
                        </div>
                    )}
                    
                    { subtitle && (
                        <div>
                            <p>{ subtitle }</p>
                        </div>
                    )}
              <div className="grid grid-cols-2 lg:grid-cols-4 py-16 p-8 items-center gap-8">     
            {stats && stats.map((item, idx) => (
                <div key={idx}>
    
                        { item.quantity && (
                           <h2 className="text-3xl sm:text-4xl font-bold ">{item.quantity}</h2>
                            
                        )}
                    
                        { item.description && (
                            <div>
                                <p className="text-xl text-muted-foreground">{item.description}</p>
                            </div>
                        )}
                    
                </div>
                 
            ))}
    </div> 
            </div>
            </section>
        );
    }

    export default Statistics;