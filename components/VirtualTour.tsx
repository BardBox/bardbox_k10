export default function VirtualTour() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary-rust to-primary-orange text-white px-8 py-6 rounded-2xl shadow-2xl">
                        <div className="flex items-center space-x-3">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <div className="text-left">
                                <h3 className="font-bold text-lg">Virtual Tour Available</h3>
                                <p className="text-sm text-white/90">Experience properties from your home</p>
                            </div>
                        </div>
                        <a
                            href="https://k10group.in/virtual-tour/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-primary-rust px-6 py-3 rounded-lg hover:bg-neutral-cream transition-all duration-300 font-semibold whitespace-nowrap"
                        >
                            Book Virtual Tour
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
