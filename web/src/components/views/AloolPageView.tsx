import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AloolPage {
  doctype: string;
  name: string;

  header: string;
  description: string;
  meta_image: string;
  route: string;
  path: string;
  remark: string;
  content: string;
}

const AloolPageView: React.FC = () => {
    const { pageName } = useParams<{ pageName: string }>();
    const [searchParams] = useSearchParams();
    const doctype = searchParams.get('doctype') || '';
    const navigate = useNavigate();

    const { data, error, isLoading } = useFrappeGetDoc<AloolPage>(doctype, pageName);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-64 w-full mb-8" />
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading page: {error.message}</div>;
    }

    if (!data) {
        return <div className="text-center">No data found for this page.</div>;
    }

    const handleGoBack = () => {
        navigate(-1); // This will go back to the previous route
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={handleGoBack} className="mb-8 flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                <img
                    src={data.meta_image}
                    alt={data.header}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white text-center">{data.header}</h1>
                </div>
            </div>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{data.header}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{data.description}</p>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.remark }} />
                </CardContent>
            </Card>

            {data.remark && (
                <Card className="bg-primary/10">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">Remark</h3>
                        <p>{data.remark}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AloolPageView;