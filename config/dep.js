const frameworkVersions = [
    {
        title: 'Vue',
        value: 'vue',
        versions: ['2.0', '3.0']
    },
    {
        title: 'React',
        value: 'react',
        versions: ['18.0.0', '18.1.0'],
        disabled: true,
        description: 'React is not supported yet'
    },
    {
        title: 'Angular',
        value: 'angular',
        versions: ['14.0.0', '15.0.0'],
        disabled: true,
        description: 'Angular is not supported yet'
    }
]

const reactDependencies = [];

const vueDependencies = [
    {
        title: 'Vue Router',
        value: 'vue-router',
        peerVersion: ['2.0', '3.0'],
        selected: true
    },
    {
        title: 'Vuex',
        value: 'vuex',
        peerVersion: ['2.0', '3.0'],
        selected: version => version === '2.0'
    },
    {
        title: 'Pinia',
        value: 'pinia',
        peerVersion: ['3.0'],
        selected: version => version === '3.0'
    },
    {
        title: 'Axios',
        value: 'axios',
        peerVersion: ['2.0', '3.0'],
        selected: true
    },
    {
        title: 'Element UI',
        value: 'element-ui',
        peerVersion: ['2.0'],
        selected: version => version === '2.0'
    },
    {
        title: 'Element Plus',
        value: 'element-plus',
        peerVersion: ['3.0'],
        selected: version => version === '3.0'
    }
]

const dependencies = {
    vue: vueDependencies,
    react: reactDependencies,
}

module.exports = {
    frameworkVersions,
    dependencies
}