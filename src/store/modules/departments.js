import { fetchEvent } from '@/api/article'

export default {
    namespaced: true,
    state: {
        tree: [],
    },
    getters: {
        // {{{ map
        map(state) {
            const fillMap = (map, items) => {
                return items.reduce((map, e) => {
                    map[e.id] = e;

                    if (e.children) {
                        return fillMap(map, e.children);
                    }
                    else {
                        return map;
                    }
                }, map);
            };

            return fillMap({}, state.tree);
        },

        // }}}
    },

    mutations: {
        // {{{ set()

        set(state, tree) {
            state.tree = tree;
        },

        // }}}
    },

    actions: {
        // {{{ create()

        async create(
            {dispatch, rootState},
            {
                name,
                parentId,
                path,
                pathName,
                type,
              factoryId
            }
        ) {
            const body = {
                factoryId,
                name,
                parentId,
                path,
                pathName,
                type,
            };
          var obj = {
            methods: 'POST',
            url: 'uc/depts',
            params: {
              factoryId:1,
            },
            data: body
          }
          fetchEvent(obj).then(response => {
            var context = this;

          })
            // 没有返回新数据的ID，所以必须刷新数据
            await dispatch('load');
        },

        // }}}
        // {{{ delete()

        async delete({state, dispatch, getters}, id) {

          const body = {
            id
          };
          var obj = {
            methods: 'DELETE',
            url: 'uc/depts/'+id,
            params: {
              id,
            },
            data: body
          }
          fetchEvent(obj).then(response => {
            var context = this;

          })
            const item = getters.map[id];

            const items = null === item.parentId ?
                state.tree : getters.map[item.parentId].children;

            items.splice(items.indexOf(item), 1);
        },

        // }}}
        // {{{ load()

        async load({commit, dispatch, rootState}) {


          return new Promise(resolve => {
            var obj = {
              url: 'uc/depts/tree',
              method: 'GET',
              params: {
                factoryId:1,
              },
              data: {
                queryString:{

                },
                currentPage: 1,
                pageSize: 10,
              }
            }
            fetchEvent(obj).then(response => {
              var context = this;
              var items = response.responseBody.map((e)=>{
                return e;
              });

              const refine = (items) => {
                return items.map(({
                  factoryId,
                  id,
                  name,
                  parentId,
                  path,
                  pathName,
                  subDepts,
                  type,
                }) => ({
                  children: refine(subDepts),
                  factoryId,
                  id,
                  name,
                  parentId,
                  path,
                  pathName,
                  type,
                }));
              };

              // }}}

              const departments = refine(items);
              commit('set', departments);
            })
          })



        },

        // }}}
        // {{{ update()

        async update(
            {dispatch, getters, state},
            {factoryId, id, name, parentId, path, pathName, type}
        ) {
            const body = {factoryId, id, name, parentId, path, pathName, type};

            const items = await dispatch(
                'api/request',
                {
                    method: 'PUT',
                    url: 'uc/depts/:id',
                    params: {id},
                    body,
                },
                {root: true},
            );

            const item = getters.map[id];

            if (item.parentId !== parentId) {
                let items = null === item.parentId ?
                    state.tree : getters.map[item.parentId].children;

                items.splice(items.indexOf(item), 1);

                items = null === parentId ?
                    state.tree : getters.map[parentId].children;

                items.push(item);
            }

            Object.assign(item, body);
        },

        // }}}
    },
};
