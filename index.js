
// >>>>>>>> Begin const discord >>>>>>>>

const Discord = require('discord.js')
const { PermissionFlagsBits } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders')
require('dotenv').config();
const { log } = require('./generalFunctions')

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS] })
module.exports = { client }

const { Instance } = require('./Instance')

const { keepAlive } = require('./server')
const token = process.env.TOKEN

let test = false
let instance

// <<<<<<<<< End const discord <<<<<<<<<

// >>>>>>>> Begin Discord Calls >>>>>>>>
/**
 * Initialises the bot onconnect
 */
client
    //.on("debug", console.log)
    //.on("warn", console.log)
    .once('ready', async () => {
    log(`Bot ${client.user.tag} online !!\n\r`)


    const guildId = '691031398768705697'
    const guild = client.guilds.cache.get(guildId)
    let commands

    // Checking if we are in a test situation with guilId present
    // (no need to push all the commands definitively in the test environment)
    /*if (guild) {
        log("Guild found")
        commands = guild.commands
        test = true
    } else {*/
    commands = client.application?.commands
    /*}*/

    // Creating the different commands
    commands?.create(new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong')
    )
    commands?.create(new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the help')
    )
    commands?.create(new SlashCommandBuilder()
        .setName('statuses')
        .setDescription('Gets the statuses of the services')
        .addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoices( 
                { name: 'All', value:'all'},
                { name: 'Kerberos-KDC-Ticket-Server', value: 'kerberos-kdc-ticket-server'},
                { name: 'LDAP', value: 'ldap'},
                { name: 'LDAPS', value: 'ldaps'}
            )
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Git Forge', 'git-forge')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    )
    commands?.create(new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds services')
        .addStringOption(option => option
            .setName('assistants-services')
            .setDescription('Services from the Assistants Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git-Assistants', 'git-assistants')
            .addChoice('Intranet-Assistants', 'intranet-assistants')
            .addChoice('k8s-Assistants-Prod-1-argoCD', 'k8s-assistants-prod-1-argocd')
            .addChoice('k8s-Assistants-Prod-1-Prometheus', 'k8s-assistants-prod-1-prometheus')
        ).addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Kerberos-KDC-Ticket-Server', 'kerberos-kdc-ticket-server')
            .addChoice('LDAP', 'ldap')
            .addChoice('LDAPS', 'ldaps')
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    )
    commands?.create(new SlashCommandBuilder()
        .setName('remove')
        .setDescription('removes services')
        .addStringOption(option => option
            .setName('assistants-services')
            .setDescription('Services from the Assistants Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git-Assistants', 'git-assistants')
            .addChoice('Intranet-Assistants', 'intranet-assistants')
            .addChoice('k8s-Assistants-Prod-1-argoCD', 'k8s-assistants-prod-1-argocd')
            .addChoice('k8s-Assistants-Prod-1-Prometheus', 'k8s-assistants-prod-1-prometheus')
        ).addStringOption(option => option
            .setName('authentication')
            .setDescription('Services from the Authentication group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Kerberos-KDC-Ticket-Server', 'kerberos-kdc-ticket-server')
            .addChoice('LDAP', 'ldap')
            .addChoice('LDAPS', 'ldaps')
        ).addStringOption(option => option
            .setName('critical')
            .setDescription('Services from the Critical group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Console-Bocal', 'console-bocal')
            .addChoice('DNS', 'dns')
            .addChoice('Gitlab', 'gitlab')
            .addChoice('Gitlab-Registry', 'gitlab-registry')
            .addChoice('Intranet-Cri', 'intranet-cri')
            .addChoice('LDAP-Cri', 'ldap-cri')
            .addChoice('S3', 's3')
            .addChoice('Vault', 'vault')
        ).addStringOption(option => option
            .setName('internal-services')
            .setDescription('Services from the Internal Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bookstack', 'bookstack')
            .addChoice('K8s-ArgoCD', 'k8s-argocd')
            .addChoice('K8s-ops-Grafana', 'k8s-ops-grafana')
            .addChoice('K8s-ops-Prometheus', 'k8s-ops-prometheus')
            .addChoice('K8s-Prod-1-Prometheus', 'k8s-prod-1-prometheus')
            .addChoice('Mail', 'mail')
        ).addStringOption(option => option
            .setName('others')
            .setDescription('Services from the Others group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Blog', 'blog')
            .addChoice('Documentation', 'documentation')
            .addChoice('HTTPS-Redirection', 'https-redirection')
            .addChoice('MaaS', 'maas')
            .addChoice('OIDC-Redirection', 'oidc-redirection')
        ).addStringOption(option => option
            .setName('pie-sm')
            .setDescription('Services from the PIE-SM group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Bttrack', 'bttrack')
            .addChoice('Django-PXE', 'django-pxe')
            .addChoice('Fleet-Manager', 'fleet-manager')
            .addChoice('iPXE', 'ipxe')
        ).addStringOption(option => option
            .setName('student-services')
            .setDescription('Services from the Student Services group')
            .setRequired(false)
            .addChoice('All', 'all')
            .addChoice('Git', 'git')
            .addChoice('Moodle-(cours)', 'moodle-(cours)')
            .addChoice('Moodle-(exams)', 'moodle-(exams)')
            .addChoice('Moodle-(Recrutement)', 'moodle-(recrutement)')
            .addChoice('News', 'news')
            .addChoice('Rocket.Chat', 'rocket-chat')
            .addChoice('Wiki-Prog', 'wiki-prog')
        )
    )
    commands?.create(new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the list of services in the CriStatus category')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    )

    log(`commands loaded\n`)

    // Creating an instance for the back side of the bot
    // It will handle the storage of the statuses
    instance = new Instance(60 * 3, 5)
})

/**
 * This function is called when the bot receives a message
 * @param {Discord.Interaction<Discord.CacheType>} interaction
 */
client.on('interactionCreate', async (interaction) => {
    // We only care about commands
    if (!interaction.isCommand())
        return
    // Extracting the command information
    const { commandName, options } = interaction

    log(`${interaction.guild.name} : Command ${commandName}`)

    // Getting the command file to execute it
    const command = require(`./commands/${commandName}.js`)

    // Executing the command
    try {
        await command.execute(interaction, options, test, instance)
    } catch (error) {
        console.error(error)
    }

})

// <<<<<<<<< End Discord Calls <<<<<<<<<

// Ask a website to ping the bot every 5 minutes to keep it alive
//keepAlive()

// Loging in the bot
client.login(token)

console.log('Logged in')

// all in : https://discord.com/api/oauth2/authorize?client_id=957708011164532766&permissions=1644971949559&scope=bot%20applications.commands

// https://discord.com/api/oauth2/authorize?client_id=957708011164532766&permissions=268437520&scope=bot%20applications.commands