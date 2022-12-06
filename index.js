
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
                    { name: 'All', value: 'all' },
                    { name: 'Kerberos-KDC-Ticket-Server', value: 'kerberos-kdc-ticket-server' },
                    { name: 'LDAP', value: 'ldap' },
                    { name: 'LDAPS', value: 'ldaps' }
                )
            ).addStringOption(option => option
                .setName('critical')
                .setDescription('Services from the Critical group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Console-Bocal', value: 'console-bocal' },
                    { name: 'DNS', value: 'dns' },
                    { name: 'Gitlab', value: 'gitlab' },
                    { name: 'Gitlab-Registry', value: 'gitlab-registry' },
                    { name: 'Intranet-Cri', value: 'intranet-cri' },
                    { name: 'LDAP-Cri', value: 'ldap-cri' },
                    { name: 'S3', value: 's3' },
                    { name: 'Vault', value: 'vault' })
            ).addStringOption(option => option
                .setName('internal-services')
                .setDescription('Services from the Internal Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bookstack', value: 'bookstack' },
                    { name: 'K8s-ArgoCD', value: 'k8s-argocd' },
                    { name: 'K8s-ops-Grafana', value: 'k8s-ops-grafana' },
                    { name: 'K8s-ops-Prometheus', value: 'k8s-ops-prometheus' },
                    { name: 'K8s-Prod-1-Prometheus', value: 'k8s-prod-1-prometheus' },
                    { name: 'Mail', value: 'mail' })
            ).addStringOption(option => option
                .setName('others')
                .setDescription('Services from the Others group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Blog', value: 'blog' },
                    { name: 'Documentation', value: 'documentation' },
                    { name: 'HTTPS-Redirection', value: 'https-redirection' },
                    { name: 'MaaS', value: 'maas' },
                    { name: 'OIDC-Redirection', value: 'oidc-redirection' })
            ).addStringOption(option => option
                .setName('pie-sm')
                .setDescription('Services from the PIE-SM group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bttrack', value: 'bttrack' },
                    { name: 'Django-PXE', value: 'django-pxe' },
                    { name: 'Fleet-Manager', value: 'fleet-manager' },
                    { name: 'iPXE', value: 'ipxe' })
            ).addStringOption(option => option
                .setName('student-services')
                .setDescription('Services from the Student Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Git', value: 'git' },
                    { name: 'Git Forge', value: 'git-forge' },
                    { name: 'Moodle-(cours)', value: 'moodle-(cours)' },
                    { name: 'Moodle-(exams)', value: 'moodle-(exams)' },
                    { name: 'Moodle-(Recrutement)', value: 'moodle-(recrutement)' },
                    { name: 'News', value: 'news' },
                    { name: 'Rocket.Chat', value: 'rocket-chat' },
                    { name: 'Wiki-Prog', value: 'wiki-prog' })
            )
        )
        commands?.create(new SlashCommandBuilder()
            .setName('add')
            .setDescription('Adds services')
            .addStringOption(option => option
                .setName('authentication')
                .setDescription('Services from the Authentication group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Kerberos-KDC-Ticket-Server', value: 'kerberos-kdc-ticket-server' },
                    { name: 'LDAP', value: 'ldap' },
                    { name: 'LDAPS', value: 'ldaps' }
                )
            ).addStringOption(option => option
                .setName('critical')
                .setDescription('Services from the Critical group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Console-Bocal', value: 'console-bocal' },
                    { name: 'DNS', value: 'dns' },
                    { name: 'Gitlab', value: 'gitlab' },
                    { name: 'Gitlab-Registry', value: 'gitlab-registry' },
                    { name: 'Intranet-Cri', value: 'intranet-cri' },
                    { name: 'LDAP-Cri', value: 'ldap-cri' },
                    { name: 'S3', value: 's3' },
                    { name: 'Vault', value: 'vault' })
            ).addStringOption(option => option
                .setName('internal-services')
                .setDescription('Services from the Internal Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bookstack', value: 'bookstack' },
                    { name: 'K8s-ArgoCD', value: 'k8s-argocd' },
                    { name: 'K8s-ops-Grafana', value: 'k8s-ops-grafana' },
                    { name: 'K8s-ops-Prometheus', value: 'k8s-ops-prometheus' },
                    { name: 'K8s-Prod-1-Prometheus', value: 'k8s-prod-1-prometheus' },
                    { name: 'Mail', value: 'mail' })
            ).addStringOption(option => option
                .setName('others')
                .setDescription('Services from the Others group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Blog', value: 'blog' },
                    { name: 'Documentation', value: 'documentation' },
                    { name: 'HTTPS-Redirection', value: 'https-redirection' },
                    { name: 'MaaS', value: 'maas' },
                    { name: 'OIDC-Redirection', value: 'oidc-redirection' })
            ).addStringOption(option => option
                .setName('pie-sm')
                .setDescription('Services from the PIE-SM group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bttrack', value: 'bttrack' },
                    { name: 'Django-PXE', value: 'django-pxe' },
                    { name: 'Fleet-Manager', value: 'fleet-manager' },
                    { name: 'iPXE', value: 'ipxe' })
            ).addStringOption(option => option
                .setName('student-services')
                .setDescription('Services from the Student Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Git', value: 'git' },
                    { name: 'Git Forge', value: 'git-forge' },
                    { name: 'Moodle-(cours)', value: 'moodle-(cours)' },
                    { name: 'Moodle-(exams)', value: 'moodle-(exams)' },
                    { name: 'Moodle-(Recrutement)', value: 'moodle-(recrutement)' },
                    { name: 'News', value: 'news' },
                    { name: 'Rocket.Chat', value: 'rocket-chat' },
                    { name: 'Wiki-Prog', value: 'wiki-prog' })
            )
        )
        commands?.create(new SlashCommandBuilder()
            .setName('remove')
            .setDescription('removes services')
            .addStringOption(option => option
                .setName('authentication')
                .setDescription('Services from the Authentication group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Kerberos-KDC-Ticket-Server', value: 'kerberos-kdc-ticket-server' },
                    { name: 'LDAP', value: 'ldap' },
                    { name: 'LDAPS', value: 'ldaps' }
                )
            ).addStringOption(option => option
                .setName('critical')
                .setDescription('Services from the Critical group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Console-Bocal', value: 'console-bocal' },
                    { name: 'DNS', value: 'dns' },
                    { name: 'Gitlab', value: 'gitlab' },
                    { name: 'Gitlab-Registry', value: 'gitlab-registry' },
                    { name: 'Intranet-Cri', value: 'intranet-cri' },
                    { name: 'LDAP-Cri', value: 'ldap-cri' },
                    { name: 'S3', value: 's3' },
                    { name: 'Vault', value: 'vault' })
            ).addStringOption(option => option
                .setName('internal-services')
                .setDescription('Services from the Internal Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bookstack', value: 'bookstack' },
                    { name: 'K8s-ArgoCD', value: 'k8s-argocd' },
                    { name: 'K8s-ops-Grafana', value: 'k8s-ops-grafana' },
                    { name: 'K8s-ops-Prometheus', value: 'k8s-ops-prometheus' },
                    { name: 'K8s-Prod-1-Prometheus', value: 'k8s-prod-1-prometheus' },
                    { name: 'Mail', value: 'mail' })
            ).addStringOption(option => option
                .setName('others')
                .setDescription('Services from the Others group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Blog', value: 'blog' },
                    { name: 'Documentation', value: 'documentation' },
                    { name: 'HTTPS-Redirection', value: 'https-redirection' },
                    { name: 'MaaS', value: 'maas' },
                    { name: 'OIDC-Redirection', value: 'oidc-redirection' })
            ).addStringOption(option => option
                .setName('pie-sm')
                .setDescription('Services from the PIE-SM group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Bttrack', value: 'bttrack' },
                    { name: 'Django-PXE', value: 'django-pxe' },
                    { name: 'Fleet-Manager', value: 'fleet-manager' },
                    { name: 'iPXE', value: 'ipxe' })
            ).addStringOption(option => option
                .setName('student-services')
                .setDescription('Services from the Student Services group')
                .setRequired(false)
                .addChoices(
                    { name: 'All', value: 'all' },
                    { name: 'Git', value: 'git' },
                    { name: 'Git Forge', value: 'git-forge' },
                    { name: 'Moodle-(cours)', value: 'moodle-(cours)' },
                    { name: 'Moodle-(exams)', value: 'moodle-(exams)' },
                    { name: 'Moodle-(Recrutement)', value: 'moodle-(recrutement)' },
                    { name: 'News', value: 'news' },
                    { name: 'Rocket.Chat', value: 'rocket-chat' },
                    { name: 'Wiki-Prog', value: 'wiki-prog' })
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
