/**
 * @param {string} name
 * @returns {(v: string) => string | true}
 */
function notEmpty(name) {
  return v => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}

/**
 * @type {(plop: import('plop').NodePlopAPI): void}
 */
module.exports = function(plop) {
  plop.setGenerator('page', {
    description: '新增页面',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入名称',
        validate: notEmpty('name')
      },
      {
        type: 'input',
        name: 'title',
        message: '请输入页面title'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{name}}/main.js',
        templateFile: './plop-templates/page/main.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{name}}/meta.json',
        templateFile: './plop-templates/page/meta.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{name}}/style.styl',
        templateFile: './plop-templates/page/style.hbs'
      },
      {
        type: 'add',
        path: 'src/pages/{{name}}/view.vue',
        templateFile: './plop-templates/page/view.hbs'
      }
    ]
  })
}
