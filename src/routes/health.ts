import { ServerRoute } from '@hapi/hapi'


const basePath = '/userApi'

const healthRoutes: ServerRoute[] =[
    {
        method: 'GET',
        path: `${basePath}/health`,
        handler: function (req, res):string {
            return 'ok';
        }
    }
]

export default healthRoutes;