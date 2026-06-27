import {
    Building2,
    Users,
    Briefcase,
    BookOpen,
    LayoutGrid,
    Globe,
    GraduationCap
} from 'lucide-react';
import studentImage from '@/assets/whyus_student.webp';
export const companyLinks = [
    {
        icon: Building2,
        titleKey: 'about',
        descKey: 'aboutDesc',
        href: '/about'
    },
    {
        icon: Users,
        titleKey: 'team',
        descKey: 'teamDesc',
        href: '/teams'
    },
    {
        icon: LayoutGrid,
        titleKey: 'services',
        descKey: 'servicesDesc',
        href: '/services'
    },
    {
        icon: BookOpen,
        titleKey: 'blog',
        descKey: 'blogDesc',
        href: '/blog'
    },
    {
        icon: GraduationCap,
        titleKey: 'partnership',
        descKey: 'partnershipDesc',
        href: '/partnership'
    },
    {
        icon: BookOpen,
        titleKey: 'universities',
        descKey: 'universitiesDesc',
        href: '/universities'
    }
];
export const trustBadges = [
    { name: 'Clutch', rating: '4.9' },
    { name: 'Gartner', rating: '4.8' }
];
export const studentProfile = {
    nameKey: "studentName",
    roleKey: "studentRole",
    image: studentImage,
    quoteKey: "studentQuote"
};
