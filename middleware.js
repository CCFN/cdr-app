export {default} from 'next-auth/middleware';

export const config = { matcher: 
    [
        '/dashboard', '/monitoring/hts', 
        '/monitoring/treatment', '/monitoring/vl', 
        '/monitoring/pmtct', '/monitoring/recency', 
        '/monitoring/ncd', '/monitoring/biometrics', 
        '/monitoring/ovc', '/reporting', '/uploads/new-upload', 
        '/uploads/view-uploads', '/settings/users', '/settings/facilities', 
        '/settings/profile', '/settings/password', 
        '/settings/lgas', '/settings/state', '/settings/roles', 
        '/settings/maintenance'
]}