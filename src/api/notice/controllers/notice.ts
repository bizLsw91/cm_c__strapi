/**
 * notice controller
 */
import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::notice.notice'
    ,({ strapi }) =>  ({
        async find(ctx) {
            // 1. 쿼리 파라미터 파싱
            const { recruitCode } = ctx.query
            const rcCode: string = recruitCode ? recruitCode as string : ''

            let categories, cateNameList, categoryFilter

            // 공지사항
            if (rcCode === '') {
                const codePrefix = 'notice'
                categories = await strapi.entityService.findMany(
                    'api::category.category',
                    {
                        filters: {
                            code: { $startsWith: codePrefix }
                        },
                        fields: ['name']
                    }
                )
                cateNameList = categories.map(c => c.name)
                categoryFilter =
                    {
                        $or: [
                            {category: {$null:true}},
                            {category: {$in: cateNameList }}
                        ]
                    }
            // 채용공고
            } else if (rcCode === 'recruit-1' || rcCode === 'recruit-2') {
                categories = await strapi.entityService.findMany(
                    'api::category.category',
                    {
                        filters: {
                            code: { $eq: rcCode }
                        },
                        fields: ['name']
                    }
                )
                cateNameList = categories.map(c => c.name)
                categoryFilter = {category:{ $in: cateNameList }}
            }

            // 4. 공지사항 필터링 조회
            const sanitizedQuery = await this.sanitizeQuery(ctx);
            const baseFilters = sanitizedQuery.filters as Record<string, unknown> | {};

            const expandedQuery = {
                ...sanitizedQuery,
                filters: {
                    ...baseFilters,
                    ...categoryFilter
                }
            }

            const { results, pagination } = await strapi.service('api::notice.notice').find(expandedQuery)

            // 5. 응답 데이터 변환
            const sanitizedResults = await this.sanitizeOutput(results, ctx)
            return this.transformResponse(sanitizedResults, { pagination })
        }
    })
);
