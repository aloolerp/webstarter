
    import React from 'react';
    import { Button } from "@/components/ui/button";  // Import Button for URL fields

    interface SectionWithTabsProps {
            title?: string;
        subtitle?: string;
        tab_1_title?: string;
        tab_1_content?: string;
        tab_2_title?: string;
        tab_2_content?: string;
        tab_3_title?: string;
        tab_3_content?: string;
        tab_4_title?: string;
        tab_4_content?: string;
        tab_5_title?: string;
        tab_5_content?: string;
        tab_6_title?: string;
        tab_6_content?: string;

    }

    const SectionWithTabs = ({ title, subtitle, tab_1_title, tab_1_content, tab_2_title, tab_2_content, tab_3_title, tab_3_content, tab_4_title, tab_4_content, tab_5_title, tab_5_content, tab_6_title, tab_6_content }: SectionWithTabsProps) => {
        return (
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
                
                { tab_1_title && (
                    <div>
                        <p>{ tab_1_title }</p>
                    </div>
                )}
                
                { tab_1_content && (
                    <div>
                        <p>{ tab_1_content }</p>
                    </div>
                )}
                
                { tab_2_title && (
                    <div>
                        <p>{ tab_2_title }</p>
                    </div>
                )}
                
                { tab_2_content && (
                    <div>
                        <p>{ tab_2_content }</p>
                    </div>
                )}
                
                { tab_3_title && (
                    <div>
                        <p>{ tab_3_title }</p>
                    </div>
                )}
                
                { tab_3_content && (
                    <div>
                        <p>{ tab_3_content }</p>
                    </div>
                )}
                
                { tab_4_title && (
                    <div>
                        <p>{ tab_4_title }</p>
                    </div>
                )}
                
                { tab_4_content && (
                    <div>
                        <p>{ tab_4_content }</p>
                    </div>
                )}
                
                { tab_5_title && (
                    <div>
                        <p>{ tab_5_title }</p>
                    </div>
                )}
                
                { tab_5_content && (
                    <div>
                        <p>{ tab_5_content }</p>
                    </div>
                )}
                
                { tab_6_title && (
                    <div>
                        <p>{ tab_6_title }</p>
                    </div>
                )}
                
                { tab_6_content && (
                    <div>
                        <p>{ tab_6_content }</p>
                    </div>
                )}
                
            </div>
        );
    }

    export default SectionWithTabs;
    